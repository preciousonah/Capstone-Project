import "./Notes.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "./../App/App";

export default function Notes({ curNote }) {
	const [title, setTitle] = useState(curNote.title);
	const [text, setText] = useState(curNote.text);
	const [isExpanded, setIsExpanded] = useState(false);

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
		<div
			className="notes-container"
			style={{
				height: isExpanded ? "auto" : "6vh",
				overflowY: isExpanded ? "scroll" : "hidden",
			}}
			onDoubleClick={() => {
				setIsExpanded((prev) => !prev);
			}}
		>
			{isExpanded ? (
				<form onSubmit={handleSaveOnClick}>
					<input
						onChange={(event) => setTitle(event.currentTarget.value)}
						type="text"
						id="note-title-input"
						name="title"
						value={title}
						required
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
			) : (
				<h2>Note</h2>
			)}
		</div>
	);
}
