import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import "./globals.css";

import { UserContextProvider } from "./UserContext";

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<App />
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
