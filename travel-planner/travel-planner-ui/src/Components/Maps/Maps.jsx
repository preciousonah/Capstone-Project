import "./Maps.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";
// new pin: lat: 37.499468, lng: -122.143871

export default function Maps({ searchOnChange, searchTerm }) {

	const mapInit = () => {
		const ref = useRef(null);
		const [map, setMap] = useState();

		useEffect(() => {
			if (ref.current && !map) {
				setMap(
					new window.google.maps.Map(ref.current, {
						zoom: 12,
						center: { lat: 37.7749, lng: -122.4194 },
					})
				);
			}
		}, [ref, map]);

		// add an onClick function to the marker
		// Not really a reason to add a key either

		const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" // test image of a flag so we can see where the pin is!

		return (
			<div
				id="displayed-map"
				ref={ref}
				style={{ flexGrow: "1", height: "100%" }}
			>
				{/* Add sample pin */}
				<Marker map={map} title="Home in the Bay" position={{ lat: 37.580952, lng: -122.065219 }} icon={ image}></Marker>
			</div>
		);
	};

	const Marker = (options) => {
		const [marker, setMarker] = useState();

		useEffect(() => {
			if (!marker) {
				setMarker(new google.maps.Marker());
			}

			return () => {
				if (marker) {
					marker.setMap(null);
				}
			};
		}, [marker]);

		useEffect(() => {
			if (marker) {
				marker.setOptions(options)
			}
		}, [marker, options]);

		return null;
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

			{/* <iframe
				frameBorder="0"
				referrerPolicy="no-referrer-when-downgrade"
				src={`https://www.google.com/maps/embed/v1/${MAP_MODE}?key=${API_KEY}&${PARAMETERS}`}
				className="embedded-map"
			></iframe> */}
		</div>
	);
}
