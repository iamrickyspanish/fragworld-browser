const test = require("ava");
const fetch = require("cross-fetch");
const { configA } = require("../fixtures");
const { before, after, beforeEach, create, isEqual } = require("../helpers");

test.serial.before(before);
test.serial.after(after);
test.serial.beforeEach(beforeEach);

test.serial("[POST /] creates a new config", async (t) => {
  await create(t.context.url, configA);
  const res = await fetch(t.context.url);
  const [config] = await res.json();
  t.true(isEqual(config, configA));
});

test.serial(
  "[POST /] creating config returns 201 and data object with config data",
  async (t) => {
    const res = await create(t.context.url, configA);
    t.is(res.status, 201);
    const config = await res.json();
    t.true(isEqual(config, configA));
  }
);