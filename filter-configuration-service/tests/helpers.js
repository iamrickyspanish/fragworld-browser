const { client, DB_NAME, COLLECTION_NAME } = require("./fixtures");
const micro = require("micro");
const listen = require("test-listen");
const handler = require("../build/index");
const fetch = require("cross-fetch");

console.log("!!!!!!!!!", handler)

const isEqual = (configA, configB) => {
  return (
    configA.game === configB.game &&
    configA.userId === configB.userId &&
    Object.keys(configA.values).length === Object.keys(configB.values).length
  );
};

const before = async (t) => {
  t.context = {};
  t.context.service = micro(handler);
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  t.context.collection = collection;
  t.context.url = await listen(t.context.service);
  await (async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  })();
};

const after = (t) => {
  t.context.service.close();
};

const beforeEach = async (t) => {
  await t.context.collection.deleteMany();
};

const create = async (url, data) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

const destroy = async (url, id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

const update = async (url, id, data) =>
  fetch(`${url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

module.exports = {
  beforeEach,
  before,
  after,
  destroy,
  update,
  create,
  isEqual
};
