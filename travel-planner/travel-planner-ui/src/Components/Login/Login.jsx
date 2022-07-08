import "./Login.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

export default function Login() {
	const { logInUser, logInFormInput, setLogInFormInput } =
		useContext(UserContext);

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
					value={logInFormInput.username}
					onChange={(event) =>
						setLogInFormInput({
							username: event.target.value,
							password: logInFormInput.password,
						})
					}
				/>
				<input
					id="login-password"
					className="auth-input"
					type="password"
					placeholder="Password"
					value={logInFormInput.password}
					onChange={(event) =>
						setLogInFormInput({
							username: logInFormInput.username,
							password: event.target.value,
						})
					}
				/>
				<button onClick={logInUser} className="auth-button">
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
