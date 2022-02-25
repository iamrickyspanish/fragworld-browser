const mongoose = require("mongoose");
const Server = require("../models/Server");
const Game = require("../models/Game");

const games = require("./games.json");
const servers = require("./servers.json");

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    await Game.remove({});
    await Server.remove({});
    const savedGames = await seedGames();
    await seedServers(savedGames);
    mongoose.connection.close();
  } catch (err) {
    console.log(`DB ${err}`);
  }
};

const seedGames = async () =>
  Promise.all(games.map((game) => Game.create({ ...game })));

const seedServers = async (games) =>
  Promise.all(
    servers.map((server) => {
      const { game, ...restSeverData } = server;
      const gameData = games.find(({ _id }) => _id === game);
      const data = {
        ...restSeverData,
        game: gameData?._id
      };
      return Server.create(data);
    })
  );

run();
