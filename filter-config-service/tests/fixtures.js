const { MongoClient } = require("mongodb");

const configA = Object.freeze({
  userId: "123",
  game: "hl",
  values: {
    minPlayers: 8
  }
});

const configB = Object.freeze({
  userId: "123",
  game: "cstrike",
  values: {
    maxPlayers: 14
  }
});

const client = new MongoClient(process.env.TEST_DB_HOST);

const DB_NAME = "filter-configs-test";
const COLLECTION_NAME = "filterconfigs";

module.exports = {
  configA,
  configB,
  DB_NAME,
  COLLECTION_NAME,
  client
};
