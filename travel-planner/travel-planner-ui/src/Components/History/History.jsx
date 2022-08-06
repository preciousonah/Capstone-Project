import "./History.css";
import { PORT } from "./../App/App";
import { UserContext } from "../../UserContext";
import Loading from "../Loading/Loading";
import Banner from "../Banner/Banner";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

export default function History(props) {
	const { sessionToken } = useContext(UserContext);
	const [trips, setTrips] = useState(null);

	// Get archived trips from database
	useEffect(async () => {
		const res = await axios.post(`http://localhost:${PORT}/maps/getUserMaps`, {
			sessionToken: sessionToken,
			isArchived: true,
		});

		setTrips(res.data);
	}, []);

	if (!trips) {
		return <Loading />;
	}

	// add an onClick to open up that page. Wait but how...
	// we need to migrate stuff out of the plan page.

	return (
		<div className="history-page">
			<h1>Archived Trips</h1>
			{trips.length === 0 && <h2>No archived trips found.</h2>}
			{trips.map((trip) => (
				<Banner
					text={trip.MapName}
					imgSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJvcGljYWwlMjBiZWFjaHxlbnwwfHwwfHw%3D&w=1000&q=80"
				/>
			))}
		</div>
	);
}
