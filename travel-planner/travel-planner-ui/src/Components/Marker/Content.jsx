import "./Marker.css";
import { useState } from "react";
import axios from "axios";

// create delete marker button?
// allow us to edit note content and also expand note content on the right side.

export default function Content({
	obj,
	markerId,
	title,
	address,
	noteContent,
	PORT,
}) {
	// Create the content displayed when user opens the infoWindow

	const [adjustTitle, setAdjustTitle] = useState(false);
	const [curTitle, setCurTitle] = useState(title);
	const [curContent, setCurContent] = useState(noteContent ? noteContent : "");

	const updateTitle = async () => {
		await axios.post(`http://localhost:${PORT}/maps/updateName`, {
			markerId: markerId,
			name: curTitle,
		});
	};

	const updateContent = async () => {
		await axios.post(`http://localhost:${PORT}/maps/updateContent`, {
			markerId: markerId,
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
								updateTitle();
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
						obj.onRemove(obj);
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
						updateContent();
					}
				}}
				type="text"
			/>
			<div className="expand-note-button">
				<i className="fa-solid fa-maximize"></i>
			</div>
		</div>
	);
}
