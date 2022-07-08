import "./Navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function Navbar() {
	const { sessionToken, signUpUser, logInUser, logOutUser } =
		useContext(UserContext);

	return (
		<div className="navbar">
			<div className="nav-left">
				<Link className="nav-item" to="/plan">
					Plan
				</Link>
				<Link className="nav-item" to="/history">
					History
				</Link>
				<Link className="nav-item" to="/">
					Overview
				</Link>
			</div>
			<div className="nav-right">
				{sessionToken && (
					<Link className="nav-item" to="/" onClick={logOutUser}>
						Log Out
					</Link>
				)}
			</div>
		</div>
	);
}
