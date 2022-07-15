const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
require("dotenv").config()
const bodyParser = require("body-parser");

const users = require("./routes/users");
const notes = require("./routes/notes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.json());

const got = require('got')
const {pipeline} = require('stream')

app.use("/notes", notes);
app.use("/users", users);


app.post("/getAddress", async (req, res) => {

	// Using this api: https://positionstack.com/

	const API_KEY = process.env.PARSE_API_KEY
	const url = `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${req.body.address}&limit=5&output=json`
	// I can specify a region (this would already be provided if the user wants recommendations)

	// need to connect the user's search bar from the front end here.
	// need to create a submit button so the user can submit the full address.

	// STRETCH: can we confirm the user typed in a valid address first before doing anything?
		// Potentially with this api: https://www.smarty.com/products/apis/international-street-api

	const dataStream = got.stream({
		url: url
	})
	pipeline(dataStream, res, (err) => {
		if (err) {
			console.log(err)
			res.sendStatus(500)
		}
		res.status(200).send({lat: dataStream.data.latitude, lng: dataStream.data.longitude, address: req.body.address, county: county})
	})

})

app.get("/", () => {
	res.status(200).send({ location: "Home page" });
});

module.exports = app;
