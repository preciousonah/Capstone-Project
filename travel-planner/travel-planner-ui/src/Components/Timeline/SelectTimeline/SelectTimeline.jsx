import "./SelectTimeline.css";
import { useState } from "react";
import axios from "axios";
import { PORT } from "./../../App/App";

export default function SelectTimelineBubble({
	timelines,
	setTimeline,
	timelineMarkers,
	setDisplayedMarkers,
	mapId,
	setPossibleTimelines,
}) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isAddNewDate, setIsAddNewDate] = useState(false);

	const handleFilterMarkersByDate = (event) => {
		if (event.target.checked) {
			// only display the markers on the timeline on the map
			setDisplayedMarkers(timelineMarkers);
		} else {
			setDisplayedMarkers(null);
		}
	};

	const createTimeline = async (date) => {
		// Save the new timeline to the backend
		const res = await axios.post(
			`http://localhost:${PORT}/timelines/createNewTimeline`,
			{
				mapId: mapId,
				date: date,
			}
		);

		// Add the date to the front-end
		if (res.status === 200) {
			setPossibleTimelines((prev) => [...prev, res.data.timeline]);
		}

		setIsAddNewDate(false);
	};

	return (
		<div
			className="select-timeline-bubble"
			style={{
				height: isExpanded ? "auto" : "6.4vh",
				overflowY: isExpanded ? "scroll" : "hidden",
			}}
			onDoubleClick={() => setIsExpanded(isExpanded ? false : true)}
		>
			<p>Select a date to display your timeline.</p>
			<div className="outer-checkbox">
				<input
					type="checkbox"
					id="filter-markers-checkbox"
					name="filter-markers-checkbox"
					onClick={(event) => handleFilterMarkersByDate(event)}
				/>
				<label htmlFor="filter-markers-checkbox">Filter map by date?</label>
			</div>
			<div className="timeline-dates-list">
				{timelines.map((timeline) => (
					<p
						key={timeline.Date}
						className="timeline-date"
						onClick={() => {
							setTimeline(timeline);
							setIsExpanded(false);
						}}
					>
						~ {timeline.Date}
					</p>
				))}
			</div>
			<p
				className="create-timeline-button"
				onClick={() => setIsAddNewDate(true)}
			>
				Add another date.
			</p>
			{isAddNewDate && (
				<input
					type="date"
					placeholder="yyyy/mm/dd"
					onChange={(event) => createTimeline(event.currentTarget.value)}
				/>
			)}
		</div>
	);
}
