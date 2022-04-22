"use strict";
const test = require("ava");
const { configA } = require("../fixtures");
const { before, after, beforeEach, destroy } = require("../helpers");
test.after(after);
test.before(before);
test.serial.beforeEach(beforeEach);
test.serial("[DELETE /:id] deletes config and returns 200", async (t) => {
    const { insertedId: id } = await t.context.collection.insertOne({
        ...configA
    });
    const res = await destroy(t.context.url, id);
    t.is(res.status, 200);
    const config = await t.context.collection.findOne({ _id: id });
    t.is(!!config, false);
});
test.serial("[DELETE /:id] returns 404 if config does not exist", async (t) => {
    const res = await destroy(t.context.url, 12345);
    t.is(res.status, 404);
});
