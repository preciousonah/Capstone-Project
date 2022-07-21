import "./Marker.css";
import { useState } from "react";
import axios from "axios";

// create delete marker button?
// allow us to edit note content and also expand note content on the right side.

export default function Content({
	infoWindow,
	markerId,
	title,
	address,
	noteContent,
	PORT,
	setCurNote,
}) {
	// Create the content displayed when user opens the infoWindow

	const [adjustTitle, setAdjustTitle] = useState(false);
	const [curTitle, setCurTitle] = useState(title);
	const [curContent, setCurContent] = useState(noteContent ? noteContent : "");

	const updateNote = async () => {
		await axios.post(`http://localhost:${PORT}/maps/updateNote`, {
			markerId: markerId,
			name: curTitle,
			content: curContent,
		});
	};

	return (
		<div className="info-window-content popup-bubble" id={`${curTitle}`}>
			<div className="info-window-top-container">
				{adjustTitle ? (
					<input
						className="info-window-title"
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								updateNote();
								setAdjustTitle(false);
							}
						}}
						onChange={(event) => setCurTitle(event.currentTarget.value)}
						value={curTitle}
					/>
				) : (
					<h2
						onDoubleClick={() => setAdjustTitle(true)}
						className="info-window-title"
					>
						{curTitle}
					</h2>
				)}
				<button
					onClick={() => {
						setAdjustTitle(false);
						infoWindow.onRemove(infoWindow);
					}}
					className="close-info-window-button"
				>
					x
				</button>
			</div>
			<p>{address}</p>
			<input
				className="info-window-note-preview"
				value={curContent}
				onChange={(event) => setCurContent(event.currentTarget.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						updateNote();
					}
				}}
				type="text"
			/>
			<div className="expand-note-button">
				<i
					onClick={() => {
						setCurNote({
							title: curTitle,
							text: curContent,
							markerId: markerId,
						});
					}}
					className="fa-solid fa-maximize"
				></i>
			</div>
		</div>
	);
}
