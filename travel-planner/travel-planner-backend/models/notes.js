const notesDb = require("./../data/userNotes.json");
const fs = require("fs");

class Notes {
	static saveNewNote(title, content) {
		var today = new Date();

		if (title in notesDb.notes) {
			notesDb.notes[title].duplicatesFound += 1;
			title += ` (${notesDb.notes[title].duplicatesFound})`;
		}

		const newNote = {
			title: title,
			content: content,
			createdAt: today.toLocaleDateString() + " " + today.toLocaleTimeString(),
			lastEdited: today.toLocaleDateString() + " " + today.toLocaleTimeString(),
			duplicatesFound: 0,
		};

		notesDb.notes[title] = newNote;
		const notesDbJson = JSON.stringify(notesDb, null, 4);
		fs.writeFileSync("./data/userNotes.json", notesDbJson, "utf-8");

		return newNote;
	}

    static updateNote(savedTitle, curTitle, content) {
        // Fetch the note from our database
        const curNote = notesDb.notes[savedTitle]

        // Update the information
        curNote.content = content
        curNote.title = curTitle

        // Rewrite the updated information in our database
		const notesDbJson = JSON.stringify(notesDb, null, 4);
        fs.writeFileSync("./data/userNotes.json", notesDbJson, "utf-8");

	}

	static openNote(title) {
		var today = new Date();

		if (title in notesDb.notes) {
			return notesDb.notes[title];
		} else {
			// return empty new note with that title
			return {
				title: title,
				content: "",
				createdAt:
					today.toLocaleDateString() + " " + today.toLocaleTimeString(),
				lastEdited:
					today.toLocaleDateString() + " " + today.toLocaleTimeString(),
				duplicatesFound: 0,
			};
		}
	}
}

module.exports = Notes;

// we need to check if that note exists first?
// if that's the case, we need to replaces it
