import "./UserPreferences.css";
import { useState } from "react";

export default function UserPreferences() {
  const [expanded, setExpanded] = useState(false);

  // query for user preferences
  // add a bunch of input boxes and fill them with the respective values (lots of state variables?)
    // Or actually just one variable that an object
  // Then on click save, save

	return (
		<div className="user-preferences-page">
			<h1>User Preferences</h1>
		</div>
	);
}
