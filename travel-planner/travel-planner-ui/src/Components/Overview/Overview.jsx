import "./Overview.css";
import UserPreferences from "../UserPreferences/UserPreferences";

export default function Overview() {
	return (
		<div className="overview">
			<h1>Welcome!</h1>
			<UserPreferences />
		</div>
	);
}
