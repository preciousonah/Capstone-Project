import "./Notes.css";

export default function Notes({
	notesText,
	handleSaveOnClick,
	updateNoteChange,
}) {
	return (
		<div className="notes-container">
			<form onSubmit={handleSaveOnClick}>
				<input
					onChange={updateNoteChange}
					type="text"
					id="note-title-input"
					value={notesText.title}
					required
					// onInvalid={}
				/>
				<textarea
					onChange={updateNoteChange}
					type="text"
					id="note-input"
					value={notesText.text}
				></textarea>
				<button id="save-note-button">Save</button>
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
