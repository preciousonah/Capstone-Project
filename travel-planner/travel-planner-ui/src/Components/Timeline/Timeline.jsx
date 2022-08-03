import "./Timeline.css";
import TimelineItem from "./TimelineItem/TimelineItem";
import Loading from "../Loading/Loading";
import SelectTimelineBubble from "./SelectTimeline/SelectTimeline";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Timeline(props) {
	const [possibleTimelines, setPossibleTimelines] = useState(null);
	const [timeline, setTimeline] = useState(null);
	const [timelineItems, setTimelineItems] = useState(null);
	const [timelineMarkers, setTimelineMarkers] = useState(null);

	useEffect(() => {
		if (timeline) {
			const fetchTimeline = async () => {
				const res = await axios.post(
					`http://localhost:${props.PORT}/timelines/getTimelineDetails`,
					{
						timelineId: timeline.objectId,
					}
				);
				setTimelineItems(res.data.timelineItems);

				// get all the markers associated with those items
				setTimelineMarkers(res.data.markers);
			};

			fetchTimeline();
		}
	}, [timeline]);

	useEffect(() => {
		const fetchAssociatedTimelines = async () => {
			const res = await axios.post(
				`http://localhost:${props.PORT}/timelines/getAssociatedTimelines`,
				{
					mapId: props.mapId,
				}
			);
			setPossibleTimelines(res.data.timelines);
		};

		fetchAssociatedTimelines();
	}, []);

	if (!possibleTimelines) {
		return <Loading />;
	}

	return (
		<>
			<SelectTimelineBubble
				timelines={possibleTimelines}
				setTimeline={setTimeline}
				timelineMarkers={timelineMarkers}
				setDisplayedMarkers={props.setMarkers}
				mapId={props.mapId}
				PORT={props.PORT}
				setPossibleTimelines={setPossibleTimelines}
			/>
			{timelineItems && (
				<div className="timeline-container">
					<h2>Timeline</h2>
					<p>{timeline.Date}</p>
					<hr></hr>
					<div className="timeline-markers">
						{timelineItems.map((item) => (
							<TimelineItem
								name={item.Name}
								startTime={item.StartTime}
								endTime={item.EndTime}
								objectId={item.objectId}
								key={item.objectId}
								PORT={props.PORT}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}
