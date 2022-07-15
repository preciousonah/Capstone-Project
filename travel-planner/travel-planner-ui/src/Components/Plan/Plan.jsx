import "./Plan.css";
import Notes from "../Notes/Notes";
import Maps from "../Maps/Maps";
import SelectTripPage from "../SelectTrip/SelectTrip";

import { UserContext } from "../../UserContext";

import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

// const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";

// fetch all maps and show a drop down.
// Then the user will select from the dropdown or create a new map
// When the user creates a new map, they will be prompted for:
// Title
// General location (this'll be the center)
// Then the map will appear, on the left there will be a general timeline on the right

export default function Plan(props) {
	const [tripDetails, setTripDetails] = useState({ title: "", center: "" });

	useEffect(async () => {
		// Create a new map (call backend)
		// Get the geocode for the city
		// set that as the map's center
		// set the map title

		axios.post(`http://localhost:${props.PORT}/maps/newMap`, {
			title: tripDetails.title,
			center: tripDetails.center
			});

		console.log(tripDetails);
	}, [tripDetails]);

	const { sessionToken, signUpUser, logInUser, logOutUser } =
		useContext(UserContext);

	const [curNote, setCurNote] = useState({ title: "Note", text: "" });
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const updateMapsSearchChange = (value) => {
		setSearchTerm(value);
	};

	const updateNoteChange = () => {
		const noteTitleInputElement = document.getElementById("note-title-input");
		const noteInputElement = document.getElementById("note-input");

		setCurNote({
			title: noteTitleInputElement.value,
			text: noteInputElement.value,
		});
	};

	const openNote = () => {
		/* The user can open a dropdown of notes titles. Sorted by data created. */
		/* The user can click on the title they want to open, then it will open */
	};

	const closeNote = () => {
		/* Users can close notes by clicking the x button on the top right of the note */
		/* The user should be able to minimze notes as well */
		/* Confirm with the user if they want to save the note or not upon close */
	};

	const handleSaveNoteOnClick = (event) => {
		event.preventDefault();

		if (isOpen) {
			axios.post(`http://localhost:${props.PORT}/notes/update`, {
				note: curNote,
			});
		} else {
			axios.post(`http://localhost:${props.PORT}/notes/save`, {
				note: curNote,
			}); // error handling?
		}

		setCurNote({ title: "Note", text: "" });

		setIsOpen(false);
	};

	const render = () => {
		console.log("Not working/loading rendering?");
		return <h1>Not working</h1>;
	};

	// console.log(tripDetails)

	return (
		<>
			{tripDetails.title === "" ? (
				<SelectTripPage setTripDetails={setTripDetails} />
			) : (
				<div className="plan-page main-page">
					<h1>{tripDetails.title} </h1>
					<h1>{tripDetails.center}</h1>
					{/* <div className="left-app">
						<Wrapper apiKey={API_KEY} render={render}>
							<div id="map">
								<Maps
									searchOnChange={updateMapsSearchChange}
									searchTerm={searchTerm}
									setCurNote={setCurNote}
								/>
							</div>
						</Wrapper>
					</div>
					<div className="right-app">
						<Notes
							notesText={curNote}
							updateNoteChange={updateNoteChange}
							handleSaveOnClick={handleSaveNoteOnClick}
						/>
					</div> */}
				</div>
			)}
		</>
	);
}
