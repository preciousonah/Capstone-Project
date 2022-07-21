import "./Notes.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Notes({ curNote, PORT }) {
	const [title, setTitle] = useState(curNote.title);
	const [text, setText] = useState(curNote.text);

	useEffect(() => {
		setTitle(curNote.title);
		setText(curNote.text);
	}, [curNote]);

	const handleSaveOnClick = (event) => {
		event.preventDefault();

		axios.post(`http://localhost:${PORT}/maps/updateNote`, {
			markerId: curNote.markerId,
			name: title,
			content: text,
		});
	};

	return (
		<div className="notes-container">
			<form onSubmit={handleSaveOnClick}>
				<input
					onChange={(event) => setTitle(event.currentTarget.value)}
					type="text"
					id="note-title-input"
					name="title"
					value={title}
					required
					// onInvalid={}
				/>
				<textarea
					onChange={(event) => setText(event.currentTarget.value)}
					type="text"
					id="note-input"
					name="text"
					value={text}
				></textarea>
				<button type="submit" id="save-note-button">
					Save
				</button>
			</form>
		</div>
	);
}

// save whatever the user types
// create an onChange function to update note-input AND save the input to json.
// when should this be saved? On change?
// save button

// need to open the note and fill it with text as well.

// handleSaveOnClick (for button)
// should send post request to save data to database

// updateNoteChange (for note-input)
// update the value of the note each time
// create a state for this?
// then we can just set the value to that state's saved input

// we should be able to open two notes at once.

// save should only pop up if there's text in the box.

// You should be able to rename your notes.

// make sure there are no duplicate notes in the database.

// allow users to bold, italicize, underline, and change font size of text
// allow users to input images into the notes

// add expand button at bottom right (next to save?)
