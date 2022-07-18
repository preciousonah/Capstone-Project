const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const got = require("got");
const { pipeline } = require("stream");
const mapsModel = require("./../models/maps");
router.use(bodyParser.json());
const Parse = require("parse/node");

router.post("/newMap", async (req, res) => {
	try {
		let title = req.body.title;
		let center = req.body.center;
		let sessionToken = req.body.sessionToken;

		// Pass in center and get lat and lng here:
		// Use this temporarily since getAddress is broken.
		const lat = 30;
		const lng = 0;

		const Maps = Parse.Object.extend("Maps");
		const Timelines = Parse.Object.extend("Timelines");

		const map = new Maps();

		let query = new Parse.Query("_Session");
		query.equalTo("sessionToken", sessionToken);
		query.first().then(function (session) {
			if (session) {
				const user = session.get("user"); // sometimes I get an error... ParseError: User is required. Don't know what's causing this though...
				map.set("User", user);
			} else {
				res.status(400).send({
					typeStatus: "danger",
					message: "ERROR: No session found for that token.",
				});
			}
		});

		map.set("MapName", title);
		map.set("Center", new Parse.GeoPoint({ latitude: lat, longitude: lng }));

		map.set("Timeline", new Timelines());

		map.save().then((newMap) => {
			res.status(200).send(newMap);
		});
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
			res.status(400).send({
				typeStatus: "danger",
				message: "ERROR: Invalid session token in getUserMaps!",
			});
		}
	});
});

router.post("/createNewMarker", async (req, res) => {
	const mapId = req.body.mapId; // Maps object
	const location = req.body.location; // {lat: , lng:}

	// or call get address here!

	try {
		const Markers = Parse.Object.extend("Markers");
		const Notes = Parse.Object.extend("Notes");
		const Maps = Parse.Object.extend("Maps");

		const mapPointer = new Maps().set("objectId", mapId);

		const marker = new Markers();

		marker.set("Map", mapPointer);
		marker.set("Note", new Notes());
		marker.set(
			"Location",
			new Parse.GeoPoint({ latitude: location.lat, longitude: location.lng })
		);

		marker.save().then((newMarker) => {
			// return the created marker so it can be added to the map
			res.status(200).send(newMarker);
		});
	} catch (error) {
		res.status(400).send({ message: error });
	}
});

router.post("/getMarkers", async (req, res) => {
	// get the marker array from the map

	try {
		const mapId = req.body.mapId;

		const Maps = Parse.Object.extend("Maps");
		const mapPointer = new Maps().set("objectId", mapId);

		let query = new Parse.Query("Markers");
		query.equalTo("Map", mapPointer);
		query.find().then((markers) => {
			res.status(200).send({ markers: markers });
		});
	} catch (error) {
		res.status(400).send({ message: error });
	}
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
