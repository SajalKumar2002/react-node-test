const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;