import "./Directions.css";
import { useState } from "react";

export default function Directions({ directions }) {
	const [isExpanded, setIsExpanded] = useState(false);
	// Get the instructions since this is saved in an array form
	var instructions = [];
	let newEle = document.createElement("div");

	directions.steps.forEach((step) => {
		newEle.innerHTML = step.instructions;

		instructions.push(newEle.innerText);
	});

	return (
		<div
			className="timeline-direction-route"
			onDoubleClick={() => setIsExpanded((prev) => !prev)}
		>
			{isExpanded ? (
				<div className="timeline-route-info">
					<hr></hr>
					<p>
						{directions.start_address}
						<b>---></b>
					</p>
					<p>{directions.end_address}</p>
					<p>
						<b>Distance:</b> {directions.distance.text}
					</p>
					<p>
						<b>Duration:</b> {directions.duration.text}
					</p>
					<hr></hr>
					{instructions.map((line) => (
						<p>{line}</p>
					))}
				</div>
			) : (
				<div className="timeline-route-preview">
					<span className="line"></span>
					<div className="route-info-preview-text">
						<p>{directions.duration.text}</p>
						<p>{directions.distance.text}</p>
					</div>
					<span className="line"></span>
				</div>
			)}
		</div>
	);
}
