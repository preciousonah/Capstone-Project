import "./SelectTimeline.css";
import { useState } from "react";

export default function SelectTimelineBubble({
	timelines,
	setTimeline,
	timelineMarkers,
	setDisplayedMarkers,
}) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleFilterMarkersByDate = (event) => {
		if (event.target.checked) {
			// only display the markers on the timeline on the map
			setDisplayedMarkers(timelineMarkers);
		} else {
			setDisplayedMarkers(null);
		}
	};

	return (
		<div
			className="select-timeline-bubble"
			style={{ height: isExpanded ? "auto" : "6.4vh" }}
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
				<label for="filter-markers-checkbox">Filter map by date?</label>
			</div>
			<div className="timeline-dates-list">
				{timelines.map((timeline) => (
					<p
						key={timeline.Date.iso}
						className="timeline-date"
						onClick={() => {
							setTimeline(timeline);
							setIsExpanded(false);
						}}
					>
						~ {timeline.Date.iso.substring(0, 10)}
					</p>
				))}
			</div>
		</div>
	);
}
