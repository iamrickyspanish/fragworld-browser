const mongoose = require("mongoose");
const axios = require("axios");

const Server = require("../db/models/Server");
const Game = require("../db/models/Game");

const games = require("../db/seed/games.json");
const servers = require("../db/seed/servers.json");
const users = require("../db/seed/users.json");

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    await Game.remove({});
    await Server.remove({});
    const savedGames = await seedGames();
    await seedServers(savedGames);
    await seedUsers();
    mongoose.connection.close();
  } catch (err) {
    console.error(`DB ${err}`);
    mongoose.connection.close();
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

const seedUsers = async () =>
  Promise.all(
    users.map((user) => {
      const { data } = await axios.post(process.env.DB_HOST, user);
      return data;
    })
  );

run();
