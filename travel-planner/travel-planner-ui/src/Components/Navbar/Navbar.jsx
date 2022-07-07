import "./Navbar.css";
import {Link} from 'react-router-dom'

export default function Navbar() {
	return (
		<div className="navbar">
			<Link className="nav-item" to="/plan">Plan</Link>
			<Link className="nav-item" to="/history">History</Link>
			<Link className="nav-item" to="/">Overview</Link>
		</div>
	);
}
