"use strict";

import mongoose, { Schema, Types as MongooseTypes, Model } from "mongoose";

/* types */

export interface IFilterConfig {
  _id: MongooseTypes.ObjectId;
  userId: string;
  game: string;
  values: any;
}

export interface IFilterConfigCreateData {
  userId: IFilterConfig["userId"];
  game: IFilterConfig["game"];
  values: IFilterConfig["values"];
}

export interface IFilterConfigUpdateData {
  userId?: IFilterConfig["userId"];
  game?: IFilterConfig["game"];
  values?: IFilterConfig["values"];
}

const getUrl = (): string =>
  (process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_HOST
    : process.env.DB_HOST) || "";

const FilterConfigSchema = new Schema<IFilterConfig>({
  userId: { type: String, required: true },
  game: { type: String, required: true },
  values: { type: Object, required: true }
});

let FilterConfig: null | Model<IFilterConfig> = null;

try {
  FilterConfig = mongoose.model<IFilterConfig>("FilterConfig");
} catch (e) {
  FilterConfig = mongoose.model<IFilterConfig>(
    "FilterConfig",
    FilterConfigSchema
  );
}

const defaultOptions = Object.freeze({
  notFoundError: "item not found",
  noDatabaseError: "database not available"
});

interface IOptions {
  notFoundError: string | object;
  noDatabaseError: string | object;
}

export default class DataService {
  options: IOptions;

  constructor(options = {}) {
    this.options = {
      ...defaultOptions,
      ...options
    };
    const url = getUrl();
    mongoose.connect(url);
    mongoose.connection.once("open", function () {
      console.log("MongoDB database connection established successfully");
    });
  }

  isReady(): boolean {
    return mongoose.connection.readyState === 1;
  }

  async get(id: MongooseTypes.ObjectId): Promise<IFilterConfig> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw this.options.notFoundError;
    const item: IFilterConfig = await FilterConfig!.findById(id).lean();
    if (!item) throw this.options.notFoundError;
    return item;
  }

  async index(data: object = {}): Promise<IFilterConfig[]> {
    const items: any[] = await FilterConfig!.find(data).lean();
    return items;
  }

  async destroy(_id: MongooseTypes.ObjectId): Promise<IFilterConfig> {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw this.options.notFoundError;
    const item = await FilterConfig!.findOneAndDelete({ _id }).lean();
    if (!item) throw this.options.notFoundError;
    return item;
  }

  async create(data: IFilterConfigCreateData): Promise<IFilterConfig> {
    const newData = {...data, userId: `${data.userId}`}
    const item = await (await FilterConfig!.create(newData)).toObject();

    return item;
  }

  async update(
    _id: MongooseTypes.ObjectId,
    data: IFilterConfigUpdateData = {}
  ) {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw this.options.notFoundError;
    const newData = {...data }
    if (data.userId) {
      newData.userId=  `${data.userId}`
    }
    
    const item = await FilterConfig!
      .findOneAndUpdate({ _id }, newData, {
        new: true
      })
      .lean();
    if (!item) throw this.options.notFoundError;
    return item;
  }
}
