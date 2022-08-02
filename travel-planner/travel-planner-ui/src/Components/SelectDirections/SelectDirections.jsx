import "./SelectDirections.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "./../Dropdown/CustomToggle";
import CustomMenu from "./../Dropdown/CustomMenu";
import DirectionReasonBubble from "./DirectionReasonBubble/DirectionReasonBubble";

export default function SelectDirections({ PORT, mapId }) {
	// get all directions from backend
	const [directions, setDirections] = useState(null);
	const [curDirections, setCurDirections] = useState(null);
	const [isInfoBubbleShown, setIsInfoBubbleShown] = useState(false);

	useEffect(() => {
		// fetch directions for the mapId

		const fetchSavedDirections = async () => {
			const res = await axios.post(
				`http://localhost:${PORT}/maps/getAllSavedDirections`,
				{
					mapId: mapId,
				}
			);

			setDirections(res.data);
		};

		fetchSavedDirections().catch(console.error);
	}, []);

	const openDirection = (event) => {
		const directionId = event.currentTarget.getAttribute("data-objectid");

		directions.forEach((direction) => {
			if (direction.objectId === directionId) {
				setCurDirections(direction);
			}
		});
	};

	if (!directions) {
		return null;
	}

	return (
		<div className="select-directions-box">
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
					Select previous directions.
				</Dropdown.Toggle>

				<Dropdown.Menu className="outer-dropdown" as={CustomMenu}>
					{directions.map((direction) => (
						<Dropdown.Item
							key={direction.objectId}
							data-objectid={direction.objectId}
							onClick={openDirection}
						>
							{direction.Origin.name} {"  -->  "} {direction.Destination.name}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<div className="direction-results">
				{curDirections ? (
					<div className="current-directions">
						<p>
							<b>{curDirections.TravelMode}</b> directions{" "}
							<i
								className="fa-solid fa-circle-info"
								onClick={() => {
									setIsInfoBubbleShown(isInfoBubbleShown ? false : true);
								}}
							></i>
						</p>
						<hr></hr>
						<p>
							<b>Distance:</b> {curDirections.Distance.text}
						</p>
						<p>
							<b>Duration:</b> {curDirections.Duration.text}
						</p>
						<hr></hr>
						{curDirections.Directions.map((line) => (
							<p key={line}>{line}</p>
						))}
					</div>
				) : null}
			</div>
			{isInfoBubbleShown && (
				<DirectionReasonBubble
					travelMode={curDirections.TravelMode}
					reason={curDirections.Reason}
					setOpen={setIsInfoBubbleShown}
				/>
			)}
		</div>
	);
}
