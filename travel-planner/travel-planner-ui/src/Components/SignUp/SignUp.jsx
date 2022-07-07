import "./SignUp.css";
import { Link } from "react-router-dom";

export default function SignUp({ signUpOnClick }) {
	return (
		<div id="sign-up-page">
			<div className="auth-box">
				<h1>Sign Up</h1>
				<div className="line"></div>
				<input
					id="signup-username"
					className="auth-input"
					type="text"
					placeholder="Username"
				/>
				<input
					id="signup-email"
					className="auth-input"
					type="text"
					placeholder="Email"
				></input>
				<input
					id="signup-password"
					className="auth-input"
					type="password"
					placeholder="Password"
				/>
				<Link to="/">
					<button onClick={signUpOnClick} className="auth-button">
						SIGN UP
					</button>
				</Link>
				<Link to="/">
					<p>Already have an account? Log in!</p>
				</Link>
			</div>
		</div>
	);
}
