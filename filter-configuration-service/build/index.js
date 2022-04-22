"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = require("micro");
const url_1 = __importDefault(require("url"));
// @ts-ignore
const micro_query_1 = __importDefault(require("micro-query"));
const dataService_1 = __importDefault(require("./src/dataService"));
const service = new dataService_1.default({
    notFoundError: (0, micro_1.createError)(404, "item not found"),
    noDatabaseError: (0, micro_1.createError)(500, "no db connection")
});
const mapRequestToId = (req) => {
    if (!req.url)
        return null;
    const { pathname } = new url_1.default.URL(req.url, `http://${req.headers.host}`);
    return pathname.slice(1).split("/")[0];
};
exports.default = async (req, res) => {
    if (req.method === "GET") {
        const id = mapRequestToId(req);
        if (id) {
            const item = await service.get(id);
            return (0, micro_1.send)(res, 200, item);
        }
        else {
            const queryData = (0, micro_query_1.default)(req);
            if (!queryData.userId)
                throw (0, micro_1.createError)(400, "userId required");
            const items = await service.index(queryData);
            return (0, micro_1.send)(res, 200, items);
        }
    }
    else if (req.method === "POST") {
        const data = (await (0, micro_1.json)(req));
        const newItem = await service.create(data);
        return (0, micro_1.send)(res, 201, newItem);
    }
    else if (req.method === "PATCH") {
        const id = mapRequestToId(req);
        const item = await service.update(id);
        return (0, micro_1.send)(res, 200, item);
    }
    else if (req.method === "DELETE") {
        const id = mapRequestToId(req);
        await service.destroy(id);
        return (0, micro_1.send)(res, 200, { message: "ok " });
    }
};
