const mongoose = require("mongoose");
const ServerModel = require("../db/models/Server");
const ServerSnapShotModel = require("../db/models/ServerSnapshot");
const GameModel = require("../db/models/Game");
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
      const serverSnapshots = serverStates.map((serverState) => {
        const { host: hostAndPort, ...restServerState } = serverState;
        const [host, port] = hostAndPort.split(":");
        return {
          game,
          ...restServerState,
          host,
          serverId: servers.find((server) => { host === server.host && port === server.port})?._id,
          port
          // countryCode:
        };
      });
      return ServerSnapShotModel.create(serverSnapshots);
    }, Promise.resolve());

    mongoose.connection.close();
  } catch (e) {
    console.error(e.message);
    mongoose.connection.close();
  }
};

run();
