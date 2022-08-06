import * as React from "react";
import axios from "axios";
import { PORT } from "./Components/App/App";

import { CookiesProvider, useCookies } from "react-cookie";

export const UserContext = React.createContext(null);

export function UserContextProvider({ children }) {
	const [cookies, setCookie, removeCookie] = useCookies(["sessionToken"]);

	const signUpUser = (signUpFormInput) => {
		// Create new user account
		axios.post(`http://localhost:${PORT}/users/register`, {
			username: signUpFormInput.username,
			email: signUpFormInput.email,
			password: signUpFormInput.password,
		});

		window.location.assign("/");
	};

	const logInUser = (logInFormInput) => {
		axios
			.post(`http://localhost:${PORT}/users/login`, {
				username: logInFormInput.username,
				password: logInFormInput.password,
			})
			.then(function (response) {
				setCookie("sessionToken", response.data.sessionToken, { path: "/" });
			})
			.catch(function (error) {
				console.log("ERROR when logging in user", error);
			});
	};

	const logOutUser = () => {
		axios.post(`http://localhost:${PORT}/users/logout`, {
			sessionToken: cookies.sessionToken,
		});
		if (cookies.sessionToken) {
			removeCookie("sessionToken", { path: "/" });
		}
	};

	const contextValue = {
		sessionToken: cookies.sessionToken,
		signUpUser: signUpUser,
		logInUser: logInUser,
		logOutUser: logOutUser,
	};

	return (
		<CookiesProvider>
			<UserContext.Provider value={contextValue}>
				{children}
			</UserContext.Provider>
		</CookiesProvider>
	);
}
