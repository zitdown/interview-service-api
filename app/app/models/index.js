const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.interviews = require("./interview.model.js")(mongoose);
db.dropdowns = require("./dropdown.model.js")(mongoose);

module.exports = db;
