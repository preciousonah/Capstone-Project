const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const got = require("got");
const { pipeline } = require("stream");
const mapsModel = require("./../models/maps");
router.use(bodyParser.json());
const Parse = require("parse/node");

router.post("/newMap", async (req, res) => {
	let title = req.body.title;
	let center = req.body.center;
	let sessionToken = req.body.sessionToken;

	// Pass in center and get lat and lng here:
	// Use this temporarily since getAddress is broken.
	const lat = 37.354559;
	const lng = -121.883844;

	try {
		mapsModel.createNewMap(title, { lat: lat, lng: lng }, sessionToken);
	} catch (error) {
		res.status(400).send({ typeStatus: "danger", message: error });
	}
});

router.post("/getUserMaps", async (req, res) => {
	// this is the only way I can do it right now without getting undefined returned. Cannot run this in models and then return here

	// fetch the user
	let query = new Parse.Query("_Session");
	query.equalTo("sessionToken", req.body.sessionToken);
	query.first().then(function (session) {
		if (session) {
			const user = session.get("user");

			// find all the maps that belong to the user
			query = new Parse.Query("Maps");
			query.equalTo("User", user);
			query
				.find()
				.then(function (maps) {
					console.log(maps);
					res.status(200).send(maps);
				})
				.catch((error) => {
					console.log("Confused? ", error);
				});
		} else {
			res.status(400).send({ message: "ERROR: Invalid session token!" })
		}
	});
});

router.post("/getAddress", async (req, res) => {
	// Fix this, it's broken !!!

	// Using this api: https://positionstack.com/

	const API_KEY = process.env.POSITION_STACK_API_KEY;
	const url = `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${req.body.address}&limit=1&output=json`;
	// I can specify a region (this would already be provided if the user wants recommendations)

	// need to connect the user's search bar from the front end here.
	// need to create a submit button so the user can submit the full address.

	// STRETCH: can we confirm the user typed in a valid address first before doing anything?
	// Potentially with this api: https://www.smarty.com/products/apis/international-street-api

	const dataStream = got.stream({
		url: url,
	});
	pipeline(dataStream, res, (err) => {
		if (err) {
			console.log(err);
			res.status(500).send({
				data: dataStream,
			});
		}
		res.status(200).send({
			data: dataStream,
		});
	});
});

module.exports = router;
