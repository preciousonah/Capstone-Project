import "./Overview.css";
import UserPreferences from "../UserPreferences/UserPreferences";
import Banner from "../Banner/Banner";
import Loading from "../Loading/Loading";
import { UserContext } from "../../UserContext";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { PORT } from "./../App/App";

export default function Overview() {
	const { sessionToken } = useContext(UserContext);
	const [recentTrip, setRecentTrip] = useState(null);

	useEffect(() => {
		const fetchMostRecentTrip = async () => {
			const res = await axios.post(
				`http://localhost:${PORT}/users/getRecentTrip`,
				{
					sessionToken: sessionToken,
				}
			);

			setRecentTrip(res.data.map);
		};
		fetchMostRecentTrip();
	}, []);

	return (
		<div className="overview">
			<Banner
				text="Welcome to TripPlanner!"
				fontSize="64px"
				imgSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJvcGljYWwlMjBiZWFjaHxlbnwwfHwwfHw%3D&w=1000&q=80"
			/>
			<div className="overview-trips-options">
				<div className="trip-preview-container">
					<div className="overview-trip-preview">
						{recentTrip ? (
							<>
								<Banner text="" imgSrc={recentTrip.Background} />
								<div>
									<h2>{recentTrip.MapName}</h2>
									<p>Last edited:</p>
									<p>{recentTrip.updatedAt.substring(0, 10)}</p>
								</div>
							</>
						) : (
							<Loading />
						)}
					</div>
					<button>See Trip!</button>
				</div>
				<div className="overview-trip-access-options">
					<a href="/Plan">
						View All <b>Trip Plans</b>
					</a>
					<a>
						{/* Need to create a new link for this. */}
						Create a <b>New Trip</b>
					</a>
					<a href="/History">
						View <b>Past Trips</b>
					</a>
				</div>
			</div>

			<UserPreferences />
		</div>
	);
}
