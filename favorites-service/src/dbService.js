const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: String,
  serverId: String
});

let Favorite = null;

try {
  Favorite = mongoose.model("Name");
} catch (e) {
  Favorite = mongoose.model("Name", FavoriteSchema);
}

const mongooseOptions = Object.freeze({
  useNewUrlParser: true,
  useUnifiedTopology: true
  //   useFindAndModify: false,
  //   useCreateIndex: true
});

const defaultOptions = Object.freeze({
  notFoundError: "item not found",
  noDatabaseError: "database not available"
});

class FavoriteService {
  constructor(options = {}) {
    this.options = {
      ...defaultOptions,
      ...options
    };
    mongoose.connect(process.env.DB_HOST, mongooseOptions);
    mongoose.connection.once("open", function () {
      console.log("MongoDB database connection established successfully");
    });
  }

  isReady() {
    return mongoose.connection.readyState === 1;
  }

  async index(data = {}) {
    return await Favorite.find(data);
  }

  async destroy(_id) {
    const favorite = await Favorite.findOneAndDelete({ _id });
    if (!favorite) throw this.options.notFoundError;
    return favorite;
  }

  async create(data = {}) {
    const { userId, serverId } = data;
    if (await Favorite.find({ userId, serverId }).length) throw "favorite alreay exists";
    return await Favorite.create({ userId, serverId });
  }
}

module.exports = FavoriteService;
