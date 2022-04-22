"use strict";
const { client, DB_NAME, COLLECTION_NAME } = require("./fixtures");
const micro = require("micro");
const listen = require("test-listen");
const handler = require("../index");
const fetch = require("cross-fetch");
const isEqual = (configA, configB) => {
    return (config.game === configA.game &&
        config.userId === configA.userId &&
        Object.keys(config.values).length === Object.keys(configA.values).length);
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
const create = async (url, data) => fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
});
const destroy = async (url, id) => fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
});
const update = async (url, id, data) => fetch(`${url}/${id}`, {
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
    create
};
