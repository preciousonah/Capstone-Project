import "./SelectDirections.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

export default function SelectDirections({ PORT, mapId }) {
	// get all directions from backend
	const [directions, setDirections] = useState(null);
  const [curDirections, setCurDirections] = useState(null);


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
						value={value}
					/>
					<ul className="list-unstyled">
						{React.Children.toArray(children).filter(
							(child) =>
								!value ||
                child.props.children
                  .join('')
									.toLowerCase()
									.includes(value.toLowerCase())
						)}
					</ul>
				</div>
			);
		}
	);

	useEffect(async () => {
		// fetch directions for the mapId
		const res = await axios.post(
			`http://localhost:${PORT}/maps/getMapDirections`,
			{
				mapId: mapId,
			}
		);

    setDirections(res.data);
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
        {curDirections ? <div className="current-directions">
          <hr></hr>
          <p><b>Distance:</b> {curDirections.Distance.text}</p>
          <p><b>Duration:</b> {curDirections.Duration.text}</p>
          <hr></hr>
          {curDirections.Directions.map((line) => <p key={line}>{line}</p>)}
        </div> : null}
			</div>
		</div>
	);
}
