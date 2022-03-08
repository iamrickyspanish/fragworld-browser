const ServerModel = require("../db/models/Server")
const mongoose = require("mongoose");
const axios = require("axios")

const mapIpToURL = (ip) => `https://ipapi.co/${ip}/json` 

const worker = async (ips = []) => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    const servers = await ServerModel.find({});
    // console.log("servers", servers);
    await Promise.all(servers.map(async (server) => {
        console.log("fetch for", server.host)
        const { data: locationData } = await axios.get(mapIpToURL(server.host))
        console.log("fetched:", locationData)
        return ServerModel.findByIdAndUpdate(server._id, {
            countryCode: locationData?.country_code
        })
    }))
    mongoose.connection.close();
  } catch (e) {
    console.error(e.message);
    mongoose.connection.close();
  }
}

worker()