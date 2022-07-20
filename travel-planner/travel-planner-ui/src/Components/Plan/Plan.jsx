import "./Plan.css";
import Notes from "../Notes/Notes";
import Maps from "../Maps/Maps";
import SelectTripPage from "../SelectTrip/SelectTrip";

import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";

export default function Plan(props) {
	const [tripDetails, setTripDetails] = useState(null);

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
								/>
							</div>
						</Wrapper>
					</div>
					<div className="right-app">
						<h1 className="map-title">{tripDetails.MapName}</h1>
						<Notes curNote={curNote} PORT={props.PORT} />
					</div>
				</div>
			)}
		</>
	);
}
