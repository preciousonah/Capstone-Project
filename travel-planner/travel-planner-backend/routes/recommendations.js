const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const axios = require("axios");
const Parse = require("parse/node");
const recModel = require("./../models/recommendations");
require("dotenv").config();

router.post("/", async (req, res) => {
	const location = req.body.location;
	const walkingDuration = req.body.walkingDuration;
	const drivingDuration = req.body.drivingDuration;
	const sessionToken = req.body.sessionToken;

	// get user given session token
	let query = new Parse.Query("_Session");
	query.equalTo("sessionToken", sessionToken);
	query.first().then(function (session) {
		if (session) {
			const user = session.get("user");
			if (user) {
				// query for user preferences
				user.fetch().then((user) => {
					user
						.get("Preferences")
						.fetch()
						.then(async (userPreferences) => {
							try {
								const result = await recModel.getRecommendation(
									userPreferences,
									walkingDuration,
									drivingDuration,
									location
								);
								res.status(200).send(result);
							} catch (error) {
								res.status(400).send({ message: error });
							}
						});
				});
			} else {
				res.status(400).send({ message: "ERROR: no user found." });
			}
		} else {
			res.status(400).send({
				typeStatus: "danger",
				message: "ERROR: No session found for that token.",
			});
		}
	});
});

module.exports = router;
