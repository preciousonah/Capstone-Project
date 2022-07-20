import "./Maps.css";
import Marker from "../Marker/Marker";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Maps({ setCurNote, trip, PORT }) {
	const ref = useRef(null);
	const [map, setMap] = useState();
	const [markers, setMarkers] = useState(null);
	const [address, setAddress] = useState("");
	const [update, setUpdate] = useState(false);

	const mapInit = () => {
		useEffect(() => {
			console.log("Map rerendered!");
			if (ref.current && !map) {
				setMap(
					new window.google.maps.Map(ref.current, {
						center: { lat: trip.Center.latitude, lng: trip.Center.longitude }, // position by default (shows the center of the map) 30, 0
						zoom: 3,
						disableDoubleClickZoom: true,
					})
				);
			}
		}, [ref, map]);

		const image =
			"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"; // test image of a flag so we can see where the pin is!

		// map.addListener("click", (event) => {
		// 	map.panTo(event.latLng)
		// })

		// get the markers
		useEffect(async () => {
			try {
				const res = await axios.post(
					`http://localhost:${PORT}/maps/getMarkers`,
					{
						mapId: trip.objectId,
					}
				);
				setMarkers(res.data.markers);
				setUpdate(false);
			} catch (error) {
				console.log("Error fetching markers: ", error);
			}
		}, [update]);

		return (
			<div
				id="displayed-map"
				ref={ref}
				style={{ flexGrow: "1", height: "100%" }}
			>
				{markers &&
					markers.map((marker) => (
						<Marker
							position={{
								lat: marker.Location.latitude,
								lng: marker.Location.longitude,
							}}
							title={marker.Name}
							icon={image}
							map={map}
							key={marker.objectId}
							objectId={marker.objectId}
							address={marker.Address}
							content={marker.Content}
							PORT={PORT}
							setCurNote={setCurNote}
						/>
					))}
			</div>
		);
	};

	const addNewMarker = async () => {
		// we really will need to get error checking

		// 1. reformat address so it can be passed to the api
		// Don't think this api needs it
		// 2. user axios post request address: address
		// Can we combine this into one post request please?
		const addressRes = await axios.post(
			`http://localhost:${PORT}/maps/getAddress`,
			{
				address: address,
			}
		);
		const location = addressRes.data.coordinates; // lets reformat how I recieve this information
		const reformattedAddress = addressRes.data.address; // these are both undefined

		// 3. call addMarker
		const newMarkerRes = await axios.post(
			`http://localhost:${PORT}/maps/createNewMarker`,
			{
				mapId: trip.objectId,
				location: location,
				address: reformattedAddress,
			}
		);
		// 4. update setMarker
		// 5. marker should be added to the map without rerendering
		setUpdate(true);

		return null;
	};

	return (
		<div className="maps-container">
			<div className="maps-search">
				<input
					onChange={(event) => setAddress(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							addNewMarker();
						}
					}}
					value={address}
					placeholder="Search"
				></input>
			</div>

			{mapInit()}
		</div>
	);
}
