const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const notes = require("./routes/notes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.json());

app.use("/notes", notes);
app.use("/users", users);

app.get("/", () => {
	res.status(200).send({ location: "Home page" });
});

module.exports = app;
