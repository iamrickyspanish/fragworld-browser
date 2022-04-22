const test = require("ava");
const { configA } = require("../fixtures");
const { before, after, beforeEach, create, isEqual } = require("../helpers");

test.serial.before(before);
test.serial.after(after);
test.serial.beforeEach(beforeEach);

test.serial(
  "[POST /] creating config returns 201 and data object with config data",
  async (t) => {
    console.log("==========>", t.context.url)
    const res = await create(t.context.url, configA);
    t.is(res.status, 201);
    const config = await res.json();
    t.true(isEqual(config, configA));
  }
);