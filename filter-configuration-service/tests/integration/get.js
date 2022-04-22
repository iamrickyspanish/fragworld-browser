const fetch = require("cross-fetch");
const test = require("ava");
const { configA, configB } = require("../fixtures");
const { before, after, beforeEach, isEqual } = require("../helpers");

test.serial.before(before);
test.serial.after(after);
test.serial.beforeEach(beforeEach);

test.serial("[GET /] returns all configs as array", async (t) => {
  await t.context.collection.insertMany([{ ...configA }, { ...configB }]);
  const res = await fetch(t.context.url);
  const configs = await res.json();
  t.true(Array.isArray(configs) && configs.length == 2);
});

test.serial(
  "[GET /] returns empty array when no configs available",
  async (t) => {
    const res = await fetch(t.context.url);
    const configs = await res.json();
    t.is(res.status, 200);
    t.true(Array.isArray(configs) && !configs.length);
  }
);

test.serial("[GET /] returns configs as objects", async (t) => {
  await t.context.collection.insertOne({ ...configA });
  const res = await fetch(t.context.url);
  t.is(res.status, 200);
  const configs = await res.json();
  t.true(isEqual(configs[0], configA));
});

test.serial("[GET /:id] returns single config as objects", async (t) => {
  const { insertedId: id } = await t.context.collection.insertOne({
    ...configA
  });
  const res = await fetch(`${t.context.url}/${id}`);
  t.is(res.status, 200);
  const config = await res.json();
  t.true(isEqual(config, configA));
});

test.serial(
  "[GET /:id] returns 404 if config with given id doesn't exist",
  async (t) => {
    const res = await fetch(`${t.context.url}/123`);
    t.is(res.status, 404);
  }
);
