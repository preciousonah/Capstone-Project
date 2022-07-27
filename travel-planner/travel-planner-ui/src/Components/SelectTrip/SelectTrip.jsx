import "./SelectTrip.css";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

import Loading from "../Loading/Loading";

function CreateNewTrip(props) {
	const [newTripTitle, setNewTripTitle] = useState(props.tripTitle);
	const [newTripCenter, setNewTripCenter] = useState("");

	const submitNewTrip = async (event) => {
		event.preventDefault();

		// Create a new trip
		// Then send that newly create trip back to Plans through setFinalTripDetails

		const res = await axios.post(`http://localhost:${props.PORT}/maps/newMap`, {
			title: newTripTitle,
			center: newTripCenter,
			sessionToken: props.sessionToken,
		});
		console.log("new trip response: ", res);
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

export default function SelectTripPage(props) {
	const { sessionToken } = useContext(UserContext);

	const [creatingTrip, setCreatingTrip] = useState("");
	const [trips, setTrips] = useState(null); // An array containing Map objects for the user

	// Get the existing trips by querying
	useEffect(async () => {
		const res = await axios.post(
			`http://localhost:${props.PORT}/maps/getUserMaps`,
			{
				sessionToken: sessionToken,
			}
		);

		setTrips(res.data);
	}, []);

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			&#x25bc;
		</a>
	));

	const CustomMenu = React.forwardRef(
		({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
			const [value, setValue] = useState("");

			return (
				<div
					ref={ref}
					style={style}
					className={className}
					aria-labelledby={labeledBy}
				>
					<Form.Control
						autoFocus
						className="mx-3 my-2 w-auto"
						placeholder="Type to filter..."
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								setCreatingTrip(value);
							}
						}}
						value={value}
					/>
					<ul className="list-unstyled">
						{React.Children.toArray(children).filter(
							(child) =>
								!value ||
								child.props.children
									.toLowerCase()
									.includes(value.toLowerCase())
						)}
					</ul>
				</div>
			);
		}
	);

	const onClickTripName = (event) => {
		const tripId = event.currentTarget.getAttribute("data-objectid");

		trips.forEach((trip) => {
			if (trip.objectId === tripId) {
				console.log("Set new trip by selection!");
				props.setTripDetails(trip);
			}
		});
	};

	if (!trips) {
		return <Loading />;
	}

	return (
		<div className="select-trip-page">
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
					Select your trip!
				</Dropdown.Toggle>

				<Dropdown.Menu className="outer-dropdown" as={CustomMenu}>
					{trips.map((trip) => (
						<Dropdown.Item
							key={trip.objectId}
							data-objectid={trip.objectId}
							onClick={onClickTripName}
						>
							{trip.MapName}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			{creatingTrip != "" && (
				<CreateNewTrip
					tripTitle={creatingTrip}
					setFinalTripDetails={props.setTripDetails}
					PORT={props.PORT}
					sessionToken={sessionToken}
				/>
			)}
		</div>
	);
}
