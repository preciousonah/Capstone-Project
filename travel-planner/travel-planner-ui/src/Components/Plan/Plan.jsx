import "./Plan.css";
import SelectTrip from "../SelectTrip/SelectTrip";
import CreateTrip from "../CreateTrip/CreateTrip";
import TripPlanner from "../TripPlanner/TripPlanner";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "./../App/App";

export default function Plan() {
	const [tripDetails, setTripDetails] = useState(null);
	const [newTripTitle, setNewTripTitle] = useState("");
	const [isArchived, setIsArchived] = useState(false);
	const [isChangeBackground, setChangeBackground] = useState(false);
	const [imageInput, setImageInput] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsArchived(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, [isArchived]);

	const updateBackground = async () => {
		setTripDetails((prev) => ({ ...prev, Background: imageInput }));
		setChangeBackground(false);

		await axios.post(`http://localhost:${PORT}/maps/setTripBackground`, {
			mapId: tripDetails.objectId,
			imgSrc: imageInput,
		});
	};

	return (
		<div className="plan-page">
			{isArchived && (
				<div className="is-archived-popup">
					<h3>
						Your trip: {tripDetails.MapName} has been archived. You can now view
						this trip in <a href="/History">History</a>.
					</h3>
				</div>
			)}
			{isChangeBackground && (
				<div className="change-background-container">
					<h3>New background image: </h3>
					<input
						value={imageInput}
						onChange={(event) => setImageInput(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Enter") updateBackground();
						}}
						placeholder="image source url"
					/>
				</div>
			)}
			{!tripDetails ? (
				<>
					{newTripTitle != "" && (
						<CreateTrip
							tripTitle={newTripTitle}
							setFinalTripDetails={setTripDetails}
						/>
					)}

					<SelectTrip
						setTripDetails={setTripDetails}
						isArchived={false}
						title="Current Trips"
						onEnter={(searchTerm) => setNewTripTitle(searchTerm)}
					/>
				</>
			) : (
				<TripPlanner
					tripDetails={tripDetails}
					setIsArchived={setIsArchived}
					setChangeBackground={setChangeBackground}
				/>
			)}
		</div>
	);
}
