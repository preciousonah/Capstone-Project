import "./SelectTrip.css";

import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

function CreateNewTrip(props) {
	const [newTripTitle, setNewTripTitle] = useState(props.tripTitle);
	const [newTripCenter, setNewTripCenter] = useState("");

	console.log("CreateNewTrip called");

	return (
		<div className="create-new-trip-form">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					props.setFinalTripDetails({title: newTripTitle, center: newTripCenter});
				}}
			>
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
	const [creatingTrip, setCreatingTrip] = useState("");

	console.log("Called SelectTripPage");

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
									.startsWith(value.toLowerCase())
						)}
					</ul>
				</div>
			);
		}
	);

	return (
		<div className="select-trip-page">
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
					Select you trip!
				</Dropdown.Toggle>

				<Dropdown.Menu as={CustomMenu}>
					<Dropdown.Item eventKey="1">Red</Dropdown.Item>
					<Dropdown.Item eventKey="2">Blue</Dropdown.Item>
					<Dropdown.Item eventKey="3" active>
						Orange
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			{creatingTrip != "" && (
				<CreateNewTrip
					tripTitle={creatingTrip}
					setFinalTripDetails={props.setTripDetails}
				/>
			)}
		</div>
	);
}
