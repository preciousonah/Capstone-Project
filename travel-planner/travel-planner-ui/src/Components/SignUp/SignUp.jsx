import "./SignUp.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

export default function SignUp() {
	const { signUpUser, signUpFormInput, setSignUpFormInput } =
		useContext(UserContext);

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
					value={signUpFormInput.username}
					onChange={(event) =>
						setSignUpFormInput({
							username: event.target.value,
							email: signUpFormInput.email,
							password: signUpFormInput.password,
						})
					}
				/>
				<input
					id="signup-email"
					className="auth-input"
					type="text"
					placeholder="Email"
					value={signUpFormInput.email}
					onChange={(event) =>
						setSignUpFormInput({
							username: signUpFormInput.username,
							email: event.target.value,
							password: signUpFormInput.password,
						})
					}
				></input>
				<input
					id="signup-password"
					className="auth-input"
					type="password"
					placeholder="Password"
					value={signUpFormInput.password}
					onChange={(event) =>
						setSignUpFormInput({
							username: signUpFormInput.username,
							email: signUpFormInput.email,
							password: event.target.value,
						})
					}
				/>
				<button onClick={signUpUser} className="auth-button">
					SIGN UP
				</button>
				<Link to="/">
					<p>Already have an account? Log in!</p>
				</Link>
			</div>
		</div>
	);
}
