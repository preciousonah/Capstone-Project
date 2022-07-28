import "./Plan.css";
import Notes from "../Notes/Notes";
import Maps from "../Maps/Maps";
import SelectTripPage from "../SelectTrip/SelectTrip";
import SelectDirections from "../SelectDirections/SelectDirections";
import axios from "axios";

import { useState } from "react";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";

export default function Plan(props) {
	const [tripDetails, setTripDetails] = useState(null);
	const [directionsMode, setDirectionsMode] = useState(false);
	const [directionsResults, setDirectionsResults] = useState(null);
	const [directionsOrigin, setDirectionsOrigin] = useState("");
	const [directionsDestination, setDirectionsDestination] = useState("");
	const [directionMarkers, setDirectionMarkers] = useState([]);

	// Instead we need to save the results from that request.
	// 1. Send this to the backend to be saved in the database
	// 2. Render these new instructions?
	// 3. We can do so with a useEffect reading a useState which contains all the queries from the backend. Create an update variable to reread?

	const calculateBestMethodOfTravel = () => {
		// query for both walking and driving duration and distance (values)
		// use will weight the following:

		// These are weights, they add up to 1, should they really?
		// This'll be hard to adjust. Honestly they can just all be random percentages and we'll just weight everything
		// let's look at how walkability works.

		let elevation = 0.4;
		let walkability = 0.3;
		let weather = 0.2;
		let duration = 0.1;
	};

	const getDirections = () => {
		console.log("Saving directions now!");

		const result = directionsResults.routes[0].legs[0];

		var directions = [];
		let newEle = document.createElement('div')

		result.steps.forEach((step) => {

			newEle.innerHTML = step.instructions

			directions.push(newEle.innerText);
		});


		axios.post(`http://localhost:${props.PORT}/maps/getDirections`, {
			type: "DRIVING",
			duration: result.duration,
			distance: result.distance,
			directions: directions,
			origin: {
				name: directionsOrigin,
				address: result.start_address,
				coordinate: directionMarkers[0],
			},
			destination: {
				name: directionsDestination,
				address: result.end_address,
				coordinate: directionMarkers[1],
			},
			mapId: tripDetails.objectId,
		});

		// Take in results
		// Add the trip/route to a dropdown menu in the Directions component
		// which on click can expand for all instructions (and hopefully also display it on the map... this can be a stretch)
		// display duration, distance, best method of travel
		// Calculate this

		// Allow the user to specify exactly how they want this.

		setDirectionsResults(null);
		setDirectionsOrigin("");
		setDirectionsDestination("");
	};

	const [curNote, setCurNote] = useState({
		title: "Note",
		text: "",
		markerId: null,
	});

	const render = () => {
		console.log("Not working/loading rendering?");
		return <h1>Not working</h1>;
	};

	return (
		<>
			{!tripDetails ? (
				<SelectTripPage setTripDetails={setTripDetails} PORT={props.PORT} />
			) : (
				<div className="plan-page main-page">
					<div className="left-app">
						<Wrapper apiKey={API_KEY} render={render}>
							<div id="map">
								<Maps
									setCurNote={setCurNote}
									trip={tripDetails}
									PORT={props.PORT}
									setCurNote={setCurNote}
									directionsMode={directionsMode}
									setDirectionsResults={setDirectionsResults}
									directionMarkers={directionMarkers}
									setDirectionMarkers={setDirectionMarkers}
								/>
							</div>
						</Wrapper>
							<button
								className="directions-mode-button"
							onClick={() => {
								setDirectionsMode(directionsMode ? false : true);
							}}
						>
								<span>Directions Mode</span> <span className={directionsMode ? "directions-mode-toggle directions-mode-toggle-on" : "directions-mode-toggle"}>{directionsMode ? "ON" : "OFF"}</span>
						</button>
						{directionsResults ? (
							<div className="save-directions-box">
								<input
									placeholder="Origin"
									value={directionsOrigin}
									onChange={(event) =>
										setDirectionsOrigin(event.currentTarget.value)
									}
								/>
								<input
									placeholder="Destination"
									value={directionsDestination}
									onChange={(event) =>
										setDirectionsDestination(event.currentTarget.value)
									}
								/>
								<button onClick={getDirections}>Save directions</button>
							</div>
						) : null}
						<SelectDirections PORT={props.PORT} mapId={tripDetails.objectId} />
					</div>
					<div className="right-app">
						<h1 className="map-title">{tripDetails.MapName}</h1>
						<Notes curNote={curNote} PORT={props.PORT} />
					</div>
					<div className="directions-content"></div>
				</div>
			)}
		</>
	);
}
