const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Parse = require("parse/node");

require("dotenv").config();

const APP_ID = process.env.PARSE_APP_ID;
const JS_KEY = process.env.PARSE_JS_KEY;
const MASTER_KEY = process.env.PARSE_MASTER_KEY;

// Initialize Parse
Parse.initialize(`${APP_ID}`, `${JS_KEY}`, `${MASTER_KEY}`);
Parse.serverURL = "https://parseapi.back4app.com/parse";

Parse.Cloud.useMasterKey();

const users = require("./routes/users");
const maps = require("./routes/maps");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.json());

app.use("/users", users);
app.use("/maps", maps);

app.get("/", () => {
	res.status(200).send({ location: "Home page" });
});

module.exports = app;
