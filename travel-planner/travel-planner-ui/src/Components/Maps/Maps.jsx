import "./Maps.css";
import Marker from "../Marker/Marker";
import { useEffect, useRef, useState } from "react";

export default function Maps({ searchOnChange, searchTerm, setCurNote }) {
	const ref = useRef(null);
	const [map, setMap] = useState();

	const mapInit = () => {
		useEffect(() => {
			console.log("Map rerendered!");
			if (ref.current && !map) {
				setMap(
					new window.google.maps.Map(ref.current, {
						center: { lat: 30, lng: 0 }, // position by default (shows the center of the map)
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

		return (
			<div
				id="displayed-map"
				ref={ref}
				style={{ flexGrow: "1", height: "100%" }}
			>
				<Marker
					position={{ lat: 37.499468, lng: -122.143871 }}
					title="MPK Office"
					icon={image}
					map={map}
				/>
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
