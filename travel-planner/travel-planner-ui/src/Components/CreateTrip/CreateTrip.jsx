import "./CreateTrip.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { PORT } from "../App/App";

export default function CreateTrip(props) {
	const [newTripTitle, setNewTripTitle] = useState(props.tripTitle);
	const [newTripCenter, setNewTripCenter] = useState("");
	const { sessionToken } = useContext(UserContext);

	const submitNewTrip = async (event) => {
		event.preventDefault();

		// Create a new trip
		// Then send that newly create trip back to Plans through setFinalTripDetails

		const res = await axios.post(`http://localhost:${PORT}/maps/newMap`, {
			title: newTripTitle,
			center: newTripCenter,
			sessionToken: sessionToken,
		});
		props.setFinalTripDetails(res.data);
	};

	return (
		<div className="create-new-trip-form">
			<form onSubmit={submitNewTrip}>
				<h1>Create a new trip!</h1>
				<div>
					<label>
						<h3>Title</h3>
						<input
							type="text"
							value={newTripTitle}
							onChange={(event) => setNewTripTitle(event.currentTarget.value)}
							className="new-trip-title"
							required
						></input>
					</label>
					<label>
						<h3>General Location</h3>
						<input
							type="text"
							placeholder="i.e. city, state, country"
							value={newTripCenter}
							onChange={(event) => {
								setNewTripCenter(event.currentTarget.value);
							}}
						></input>
					</label>
				</div>
				<button type="submit">Create trip</button>
			</form>
		</div>
	);
}
