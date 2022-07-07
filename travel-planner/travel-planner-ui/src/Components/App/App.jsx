import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Plan from "../Plan/Plan";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import { UserContext } from "../../UserContext";

const PORT = 3001;

export default function App() {
	const { sessionToken, signUpUser, logInUser, logOutUser } =
		React.useContext(UserContext);

	return (
		<div className="app">
			<BrowserRouter>
				{/* We only show the navbar options if there is a user logged in. */}
				{/* Create an overview page later under the login so new users can see what they can do with the website. */}
				<Navbar />
				<div className="body">
					<Routes>
						{!sessionToken ? (
							<>
								<Route path="/signUp" element={<SignUp />} />
								<Route path="*" element={<Login logInOnClick={logInUser} />} />
							</>
						) : (
							<>
								<Route path="/" element={<h1>Home!</h1>} />
								<Route path="/plan" element={<Plan PORT={PORT} />} />
							</>
						)}
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

// Home is the log in page unless you're logged in
