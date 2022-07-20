import "./Maps.css";
import Marker from "../Marker/Marker";
import Loading from "../Loading/Loading";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Maps({
	searchOnChange,
	searchTerm,
	setCurNote,
	trip,
	PORT,
}) {
	const ref = useRef(null);
	const [map, setMap] = useState();
	const [markers, setMarkers] = useState(null);

	const mapInit = () => {
		useEffect(() => {
			console.log("Map rerendered!");
			if (ref.current && !map) {
				setMap(
					new window.google.maps.Map(ref.current, {
						center: { lat: trip.Center.latitude, lng: trip.Center.longitude },
						zoom: 3,
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
			const res = await axios.post(`http://localhost:${PORT}/maps/getMarkers`, {
				mapId: trip,
			});
			setMarkers(res.data);
		}, []);

		if (!markers) {
			return <Loading />;
		}

		return (
			<div
				id="displayed-map"
				ref={ref}
				style={{ flexGrow: "1", height: "100%" }}
			>
				{markers.map((marker) => (
					<Marker
						position={{
							lat: marker.Location.latitude,
							lng: marker.Location.longitude,
						}}
						title={marker.Name}
						icon={image}
						map={map}
						key={marker.objectId}
					/>
				))}
			</div>
		);
	};

	return (
		<div className="maps-container">
			<div className="maps-search">
				<input
					onChange={(event) => searchOnChange(event.target.value)}
					value={searchTerm}
					placeholder="Search"
				></input>
			</div>

			{mapInit()}
		</div>
	);
}
