import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
// import { UserContextProvider } from "../../UserContext";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Plan from "../Plan/Plan";
import Login from "../Login/Login";

import { UserContext } from "../../UserContext";

const PORT = 3001;

export default function App() {
	const {sessionToken, signUpUser, logInUser, logOutUser} = React.useContext(UserContext)

	// const [curUser, setCurUser] = React.useState(null);
	// const [sessionToken, setSessionToken] = React.useState(null);

	// const signUpUser = () => {
	// 	// Create new user account
	// 	axios
	// 		.post(`http://localhost:${PORT}/users/register`, {
	// 			username: document.getElementById("username").value,
	// 			email: document.getElementById("email").value,
	// 			password: document.getElementById("password").value,
	// 		})
	// 		.then(function (response) {
	// 			console.log(response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});

	// 	document.getElementById("username").value = "";
	// 	document.getElementById("email").value = "";
	// 	document.getElementById("password").value = "";
	// };

	// const logInUser = () => {
	// 	const usernameElem = document.getElementById("login-username");
	// 	const passwordElem = document.getElementById("login-password");
	// 	axios
	// 		.post(`http://localhost:${PORT}/users/login`, {
	// 			username: usernameElem.value,
	// 			password: passwordElem.value,
	// 		})
	// 		.then(function (response) {
	// 			setSessionToken(response.data.sessionToken);
	// 			console.log(response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});

	// 	setCurUser(usernameElem.value); // change this to the information associated with this user.

	// 	usernameElem.value = "";
	// 	passwordElem.value = "";
	// };

	// const logOutUser = () => {
	// 	axios.post(`http://localhost:${PORT}/users/logout`, {
	// 		sessionToken: sessionToken,
	// 	});
	// 	setCurUser(null);
	// 	// setSessionToken(null);
	// };

	// if (!sessionToken) {
	// 	return (
	// 		<div className="body">
	// 			<Login logInOnClick={logInUser} />
	// 		</div>
	// 	);
	// }

	return (
		<div className="app">
			{/* <UserContextProvider> */}
				<BrowserRouter>
					{/* We only show the navbar options if there is a user logged in. */}
					{/* Create an overview page later under the login so new users can see what they can do with the website. */}
					{/* When I open a new link (i.e., click on 'plan' the sessionKey resets to null */}
					<Navbar />
					<div className="body">
						<Routes>
							{!sessionToken ? (
								<Route path="*" element={<Login logInOnClick={logInUser} />} />
							) : (
								<>
									<Route path="/" element={<h1>Home!</h1>} />
									<Route path="/plan" element={<Plan PORT={PORT} />} />
								</>
							)}
						</Routes>

						<button className="logoutButton" onClick={logOutUser}>
							Log Out
						</button>
					</div>
				</BrowserRouter>
			{/* </UserContextProvider> */}
		</div>
	);
}

// Home is the log in page unless you're logged in
