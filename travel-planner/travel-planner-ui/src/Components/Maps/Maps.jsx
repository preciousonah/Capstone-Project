import "./Maps.css";

export default function Maps({ searchOnChange, searchTerm }) {
	/* This will need to be moved to the backend for security reasons!! */
	// for more map modes, see: https://developers.google.com/maps/documentation/embed/embedding-map#choosing_map_modes
	const MAP_MODE = "place"; // directions is also an option!!
	const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg";
	// this can be the address or specific location name
	const PARAMETERS = "q=San+Francisco,California"; //&center=latitude,logitude

	return (
		<div className="maps-container">
			<div className="maps-search">
				<input
					onChange={searchOnChange}
					value={searchTerm}
					placeholder="Search"
				></input>
			</div>
			<iframe
				frameBorder="0"
				referrerPolicy="no-referrer-when-downgrade"
				src={`https://www.google.com/maps/embed/v1/${MAP_MODE}?key=${API_KEY}&${PARAMETERS}`}
				className="embedded-map"
			></iframe>
		</div>
	);
}
