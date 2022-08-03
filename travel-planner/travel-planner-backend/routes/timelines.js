const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Parse = require("parse/node");
router.use(bodyParser.json());

router.post("/getAssociatedTimelines", async (req, res) => {
	const mapId = req.body.mapId;

	const Maps = Parse.Object.extend("Maps");

	try {
		const mapPointer = new Maps().set("objectId", mapId);

		let query = new Parse.Query("Timelines");
		query.equalTo("Map", mapPointer);
		const timelines = await query.find();

		res.status(200).send({ timelines: timelines });
		// then on the front end, create a dropdown for this. The user will open up the selected timeline. Which are by date
		// need to add button for user to create timeline
	} catch (error) {
		res.status(400).send({ message: error, type: "Danger" });
	}
});

router.post("/getTimelineDetails", async (req, res) => {
	// query for all timelines of that map (for now just display the first one found)
	// then parse information from that

	const timelineId = req.body.timelineId;

	try {
		let query = new Parse.Query("Timelines");
		query.equalTo("objectId", timelineId);
		const timelineResult = await query.first();

		query = new Parse.Query("TimelineItems");
		query.equalTo("Timeline", timelineResult);
		let timelineItems = await query.find();

		// get all the markers associated with these timeline items
		let alreadyQueriedIds = []
		let markers = [];
		let markerId;

		for (item of timelineItems) {
			query = new Parse.Query("Markers");

			markerId = item.get("Marker").id
			if (alreadyQueriedIds.includes(markerId)) {
				continue
			}

			alreadyQueriedIds.push(markerId)
			query.equalTo("objectId", markerId);

			markers.push(await query.first());
		}

		// sort the timeline items by start time.
		timelineItems.sort((a, b) => {
			if (a.toJSON().StartTime.hour < b.toJSON().StartTime.hour) {
				return -1;
			} else if (a.toJSON().StartTime.hour > b.toJSON().StartTime.hour) {
				return 1;
			} else {
				if (a.toJSON().StartTime.min < b.toJSON().StartTime.min) {
					return -1;
				} else {
					return 1;
				}
			}
		});

		res.status(200).send({
			timeline: timelineResult,
			timelineItems: timelineItems,
			markers: markers,
		});
	} catch (error) {
		res.status(400).send({ message: error, type: "Danger" });
	}
});

router.post("/createEvent", async (req, res) => {
	const markerId = req.body.markerId;
	const timelineId = "FKPlJ7tNTk"; // will need to replace this with an actual getter function later

	const Timelines = Parse.Object.extend("Timelines");
	const TimelineItems = Parse.Object.extend("TimelineItems");
	const Markers = Parse.Object.extend("Markers");

	try {
		const markerPointer = new Markers().set("objectId", markerId);
		const timeline = new Timelines().set("objectId", timelineId);
		const newEvent = new TimelineItems();

		newEvent.set("Marker", markerPointer);
		newEvent.set("Timeline", timeline);

		let query = new Parse.Query("Markers");
		query.equalTo("objectId", markerId);
		const marker = await query.first();
		newEvent.set("Name", marker.get("Name"));

		newEvent.save().then(() => {
			res.status(200).send({ message: "Success!" });
		});
	} catch (error) {
		res.status(400).send({ message: error });
	}
});

router.post("/saveEvent", async (req, res) => {
	const { startTime, endTime, itemId } = req.body;

	try {
		let query = new Parse.Query("TimelineItems");
		query.equalTo("objectId", itemId);
		const item = await query.first();

		item.set("StartTime", startTime);
		item.set("EndTime", endTime);

		item.save().then(() => {
			res.status(200).send({ message: "Success!" });
		});
	} catch (error) {
		res.status(400).send({ message: error, type: "Error" });
	}
});

router.post("/saveTimeline", async (req, res) => {});

module.exports = router;
