const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    length: 2
  },
  name: String,
  region: String,
  subRegion: String
});

const CountryModel = mongoose.model("Country", schema);

module.exports = CountryModel;
