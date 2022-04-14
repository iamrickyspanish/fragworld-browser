const mongoose = require("mongoose");
const ServerModel = require("../db/models/Server");
const ServerSnapShotModel = require("../db/models/ServerSnapshot");
const GameModel = require("../db/models/Game");
const CountryModel = require("../db/models/Country");
const axios = require("axios");
const groupBy = require("lodash/groupBy");

const fetchServers = async (type, hosts) => {
  const res = await axios.get(process.env.RELAY_URL, {
    data: {
      type,
      hosts
    }
  });
  return res?.data || [];
};

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);

    const servers = await ServerModel.find({});
    const serversByGame = groupBy(servers, "game");
    await Object.keys(serversByGame).reduce(async (p, game) => {
      await p;
      await ServerSnapShotModel.remove({ game });
      const gameData = await GameModel.findOne({ _id: game });
      if (!gameData) throw "unknown game";
      const hosts = serversByGame[game].map(
        (server) => `${server.host}:${server.port}`
      );
      const serverStates = await fetchServers(gameData.type, hosts);
      const serverSnapshots = await Promise.all(
        serverStates.map(async (serverState) => {
          const { host: hostAndPort, ...restServerState } = serverState;
          const [host, port] = hostAndPort.split(":");
          const server = servers.find(
            (server) =>
              host === server.host && Number(port) === Number(server.port)
          );
          const country = await CountryModel.findOne({
            _id: server?.countryCode
          });

          return {
            game,
            ...restServerState,
            host,
            serverId: server?._id,
            countryCode: server?.countryCode,
            countryName: country?.name,
            regionName: country?.region,
            port
          };
        })
      );
      return ServerSnapShotModel.create(serverSnapshots);
    }, Promise.resolve());

    mongoose.connection.close();
  } catch (e) {
    console.error(e.message);
    mongoose.connection.close();
  }
};

run();
