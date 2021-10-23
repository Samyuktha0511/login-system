const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

//uname = pass = samyuktha511

exports.connect = () => {
    mongoose.connect(process.env.ATLAS_URI, {});
    console.log(process.env.ATLAS_URI)
}

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})
