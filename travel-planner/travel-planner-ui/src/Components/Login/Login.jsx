import "./Login.css";
import { Link } from "react-router-dom";

export default function Login({ logInOnClick }) {
	return (
		<div id="login-page">
			<div className="auth-box">
				<h1>Login</h1>
				<div className="line"></div>
				<input
					id="login-username"
					className="auth-input"
					type="text"
					placeholder="Username"
				/>
				<input
					id="login-password"
					className="auth-input"
					type="password"
					placeholder="Password"
				/>
				<button onClick={logInOnClick} className="auth-button">
					LOG IN
				</button>
				<p className="forgot-password-button">Forgot password?</p>
				<Link to="/signUp">
					<p>Don't have an account? Sign up!</p>
				</Link>
			</div>
		</div>
	);
}
