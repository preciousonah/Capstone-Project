import * as React from 'react'
import axios from 'axios';

export const UserContext = React.createContext(null)

const PORT = 3001;

export function UserContextProvider({children}) {
    const [sessionToken, setSessionToken] = React.useState(null)

    const signUpUser = () => {
		// Create new user account
		axios
			.post(`http://localhost:${PORT}/users/register`, {
				username: document.getElementById("signup-username").value,
				email: document.getElementById("signup-email").value,
				password: document.getElementById("signup-password").value,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		document.getElementById("signup-username").value = "";
		document.getElementById("signup-email").value = "";
		document.getElementById("signup-password").value = "";

		window.location.assign("/")
	};

	const logInUser = () => {
		const usernameElem = document.getElementById("login-username");
		const passwordElem = document.getElementById("login-password");
		axios
			.post(`http://localhost:${PORT}/users/login`, {
				username: usernameElem.value,
				password: passwordElem.value,
			})
			.then(function (response) {
				setSessionToken(response.data.sessionToken);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		// setCurUser(usernameElem.value); // change this to the information associated with this user.

		usernameElem.value = "";
		passwordElem.value = "";
	};

	const logOutUser = () => {
		axios.post(`http://localhost:${PORT}/users/logout`, {
			sessionToken: sessionToken,
		});
		// setCurUser(null);
		setSessionToken(null);
    };

    const contextValue = {
        sessionToken: sessionToken,
        signUpUser: signUpUser,
        logInUser: logInUser,
        logOutUser: logOutUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
