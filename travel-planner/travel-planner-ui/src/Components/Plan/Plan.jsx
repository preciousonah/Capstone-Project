import "./Plan.css";
import Notes from "../Notes/Notes";
import Maps from "../Maps/Maps";

export default function Plan() {
	return (
		<div className="plan-page main-page">
            <div className="left-app">
                <div id="map">
                    {/* insert map here */}
                    {/* Figure out how to add pins to the map here. */}
                    <Maps/>
                </div>
            </div>
            <div className="right-app">
                <Notes/>
            </div>
		</div>
	);
}
