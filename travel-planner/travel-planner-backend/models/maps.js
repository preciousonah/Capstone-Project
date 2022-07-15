const Parse = require("parse/node");
const got = require("got");
const { pipeline } = require("stream");

class Maps {
	static async createNewMap(title, center, sessionToken) {
		const Maps = Parse.Object.extend("Maps");
		const Timelines = Parse.Object.extend("Timelines");

		const map = new Maps();

		let query = new Parse.Query("_Session");
		query.equalTo("sessionToken", sessionToken);
		query.first().then(function (session) {
			if (session) {
				const user = session.get("user");
				map.set("User", user);
			} else {
				throw "ERROR: Invalid session token!";
			}
		});

		map.set("MapName", title);
		map.set(
			"Center",
			new Parse.GeoPoint({ latitude: center.lat, longitude: center.lng })
		);

		map.set("Timeline", new Timelines());

		map.save().then((newMap) => {
			return newMap;
		});
	}

	static async getUserMaps(sessionToken) {
		let query = new Parse.Query("_Session");
		query.equalTo("sessionToken", sessionToken);
		query.first().then(function (session) {
			if (session) {
				const user = session.get("user");

				query = new Parse.Query("Maps");
				query.equalTo("User", user);
				query
					.find()
					.then(function (maps) {
						console.log(maps);
						return maps;
					})
					.catch((error) => {
						console.log("Confused? ", error);
					});
			} else {
				throw "ERROR: Invalid session token!";
			}
		});
	}

	static async getAddress(address) {
		// Using this api: https://positionstack.com/

		const API_KEY = process.env.POSITION_STACK_API_KEY;
		const url = `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${address}&limit=5&output=json`;
		// I can specify a region (this would already be provided if the user wants recommendations)

		// need to connect the user's search bar from the front end here.
		// need to create a submit button so the user can submit the full address.

		// STRETCH: can we confirm the user typed in a valid address first before doing anything?
		// Potentially with this api: https://www.smarty.com/products/apis/international-street-api

		const dataStream = got.stream({
			url: url,
		});
		pipeline(dataStream, address, (err) => {
			if (err) {
				console.log(err);
				throw err;
			}
			console.log(dataStream.data);
			return {
				lat: dataStream.data.latitude,
				lng: dataStream.data.longitude,
				address: address,
				county: dataStream.data.county,
			};
		});
	}
}

module.exports = Maps;
