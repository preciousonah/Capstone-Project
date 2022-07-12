import "./Plan.css";
import Notes from "../Notes/Notes";
import Maps from "../Maps/Maps";

import { UserContext } from "../../UserContext";

import { useState, useContext } from "react";
import axios from "axios";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";

export default function Plan(props) {
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
		console.log("Not working/loading rendering?")
		return <h1>Not working</h1>;
	};

	return (
		<div className="plan-page main-page">
			<div className="left-app">
				<Wrapper apiKey={API_KEY} render={render}>
					<div id="map">
						{/* insert map here */}
						{/* Figure out how to add pins to the map here. */}
						<Maps
							searchOnChange={updateMapsSearchChange}
							searchTerm={searchTerm}
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
			</div>
		</div>
	);
}
