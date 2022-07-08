import * as React from "react";
import axios from "axios";

export const UserContext = React.createContext(null);

const PORT = 3001;

export function UserContextProvider({ children }) {
	const [sessionToken, setSessionToken] = React.useState(null);

	const signUpUser = (signUpFormInput) => {
		// Create new user account
		axios
			.post(`http://localhost:${PORT}/users/register`, {
				username: signUpFormInput.username,
				email: signUpFormInput.email,
				password: signUpFormInput.password,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
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
				setSessionToken(response.data.sessionToken);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const logOutUser = () => {
		axios.post(`http://localhost:${PORT}/users/logout`, {
			sessionToken: sessionToken,
		});
		setSessionToken(null);
	};

	const contextValue = {
		sessionToken: sessionToken,
		signUpUser: signUpUser,
		logInUser: logInUser,
		logOutUser: logOutUser,
	};

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
}
