"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const getUrl = () => (process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_HOST
    : process.env.DB_HOST) || "";
const FilterConfigSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    userId: mongoose_1.Schema.Types.ObjectId,
    game: String,
    values: Object
});
let FilterConfig = null;
try {
    FilterConfig = mongoose_1.default.model("FilterConfig");
}
catch (e) {
    FilterConfig = mongoose_1.default.model("FilterConfig", FilterConfigSchema);
}
const defaultOptions = Object.freeze({
    notFoundError: "item not found",
    noDatabaseError: "database not available"
});
class DataService {
    options;
    constructor(options = {}) {
        this.options = {
            ...defaultOptions,
            ...options
        };
        const url = getUrl();
        mongoose_1.default.connect(url);
        mongoose_1.default.connection.once("open", function () {
            console.log("MongoDB database connection established successfully");
        });
    }
    isReady() {
        return mongoose_1.default.connection.readyState === 1;
    }
    async get(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            throw this.options.notFoundError;
        const item = await FilterConfig.findById(id).lean();
        if (!item)
            throw this.options.notFoundError;
        return item;
    }
    async index(data = {}) {
        const items = await FilterConfig.find(data).lean();
        return items;
    }
    async destroy(_id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(_id))
            throw this.options.notFoundError;
        const item = await FilterConfig.findOneAndDelete({ _id }).lean();
        if (!item)
            throw this.options.notFoundError;
        return item;
    }
    async create(data) {
        const item = await (await FilterConfig.create(data)).toObject();
        return item;
    }
    async update(_id, data = {}) {
        if (!mongoose_1.default.Types.ObjectId.isValid(_id))
            throw this.options.notFoundError;
        const item = await FilterConfig
            .findOneAndUpdate({ _id }, data, {
            new: true
        })
            .lean();
        if (!item)
            throw this.options.notFoundError;
        return item;
    }
}
exports.default = DataService;
