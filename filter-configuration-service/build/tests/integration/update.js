"use strict";
const test = require("ava");
const { configA, configB } = require("../fixtures");
const { before, after, beforeEach, update, isEqual } = require("../helpers");
test.after(after);
test.before(before);
test.serial.beforeEach(beforeEach);
test.serial("[PATCH /:id] returns 200 and updated config data", async (t) => {
    const { insertedId: id } = await t.context.collection.insertOne({
        ...configA
    });
    const res = await update(t.context.url, id, configB);
    t.is(res.status, 200);
    const config = await res.json();
    t.true(isEqual(config, configB));
});
test.serial("[PATCH /:id] returns 404 if config does not exist", async (t) => {
    const res = await update(t.context.url, 12345, configB);
    t.is(res.status, 404);
});
