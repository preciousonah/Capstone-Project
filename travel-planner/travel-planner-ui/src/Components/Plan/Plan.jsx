import "./Plan.css";
import Notes from "../Notes/Notes";
import Timeline from "../Timeline/Timeline";
import Maps from "../Maps/Maps";
import SelectTripPage from "../SelectTrip/SelectTrip";
import SelectDirections from "../SelectDirections/SelectDirections";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../UserContext";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";

export default function Plan(props) {
	const [tripDetails, setTripDetails] = useState(null);
	const [directionsMode, setDirectionsMode] = useState(false);
	const [directionsResults, setDirectionsResults] = useState(null);
	const [walkingResults, setWalkingResults] = useState(null);
	const [drivingResults, setDrivingResults] = useState(null);
	const previousVals = useRef({ walkingResults, drivingResults });
	const [directionsOrigin, setDirectionsOrigin] = useState("");
	const [directionsDestination, setDirectionsDestination] = useState("");
	const [directionMarkers, setDirectionMarkers] = useState([]);
	const { sessionToken } = useContext(UserContext);
	const [markers, setMarkers] = useState(null);
	const [updateMarkers, setUpdateMarkers] = useState(false);

	// get the markers
	useEffect(() => {
		if (tripDetails) {
			const fetchMarkers = async () => {
				try {
					const res = await axios.post(
						`http://localhost:${props.PORT}/maps/getMarkers`,
						{
							mapId: tripDetails.objectId,
						}
					);
					setMarkers(res.data.markers);
					setUpdateMarkers(false);
				} catch (error) {
					console.log("Error fetching markers in UI: ", error);
				}
			};

			fetchMarkers();
		}
	}, [tripDetails, updateMarkers]);

	useEffect(() => {
		const fetchRecommendations = async () => {
			if (
				previousVals.current.drivingResults != drivingResults &&
				previousVals.current.walkingResults != walkingResults
			) {
				previousVals.current = { walkingResults, drivingResults };
				if (walkingResults === "") {
					setDirectionsResults({
						result: drivingResults,
						type: "DRIVING",
						reason: "The distance is beyond walking capabilities.",
					});
					return;
				}
				if (walkingResults && drivingResults) {
					const result = await axios.post(
						`http://localhost:${props.PORT}/recommendations`,
						{
							location: directionMarkers[0],
							walkingDuration: walkingResults.duration,
							drivingDuration: drivingResults.duration,
							sessionToken: sessionToken,
						}
					);

					console.log("Result: ", result);

					if (result.data.type === "DRIVING") {
						setDirectionsResults({
							result: drivingResults,
							type: "DRIVING",
							reason: result.data.reason,
						});
					} else if (result.data.type === "WALKING") {
						setDirectionsResults({
							result: walkingResults,
							type: "WALKING",
							reason: result.data.reason,
						});
					} else {
						console.log(
							"ERROR: invalid travel mode specified: ",
							result.data.type
						);
					}
				}
			}
		};
		fetchRecommendations();
	}, [walkingResults, drivingResults]);

	const getDirections = () => {
		var directions = [];
		let newEle = document.createElement("div");

		directionsResults.result.steps.forEach((step) => {
			newEle.innerHTML = step.instructions;

			directions.push(newEle.innerText);
		});

		axios.post(`http://localhost:${props.PORT}/maps/createMapDirections`, {
			type: directionsResults.type,
			duration: directionsResults.result.duration,
			distance: directionsResults.result.distance,
			directions: directions,
			origin: {
				name: directionsOrigin,
				address: directionsResults.result.start_address,
				coordinate: directionMarkers[0],
			},
			destination: {
				name: directionsDestination,
				address: directionsResults.result.end_address,
				coordinate: directionMarkers[1],
			},
			mapId: tripDetails.objectId,
			reason: directionsResults.reason,
		});

		setDirectionsResults(null);
		setDrivingResults(null);
		setWalkingResults(null);
		setDirectionsOrigin("");
		setDirectionsDestination("");
	};

	const [curNote, setCurNote] = useState({
		title: "Note",
		text: "",
		markerId: null,
	});

	const render = () => {
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
									directionMarkers={directionMarkers}
									setDirectionMarkers={setDirectionMarkers}
									setDrivingResults={setDrivingResults}
									setWalkingResults={setWalkingResults}
									displayedMarkers={markers}
									setUpdate={setUpdateMarkers}
								/>
							</div>
						</Wrapper>
						<button
							className="directions-mode-button"
							onClick={() => {
								setDirectionsMode(directionsMode ? false : true);
							}}
						>
							<span>Directions Mode</span>{" "}
							<span
								className={
									directionsMode
										? "directions-mode-toggle directions-mode-toggle-on"
										: "directions-mode-toggle"
								}
							>
								{directionsMode ? "ON" : "OFF"}
							</span>
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
						{/* <Notes curNote={curNote} PORT={props.PORT} /> */}
						<Timeline
							mapId={tripDetails.objectId}
							PORT={props.PORT}
							setMarkers={setMarkers}
						/>
					</div>
					<div className="directions-content"></div>
				</div>
			)}
		</>
	);
}
