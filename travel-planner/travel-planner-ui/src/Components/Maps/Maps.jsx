import "./Maps.css";

export default function Maps() {
    /* This will need to be moved to the backend for security reasons!! */
    // for more map modes, see: https://developers.google.com/maps/documentation/embed/embedding-map#choosing_map_modes
    const MAP_MODE = "place" // directions is also an option!!
    const API_KEY = "AIzaSyDUuAbmaWWY2Lk6iKlktVEPRAIrTI0__eg"
    const PARAMETERS = "q=City+Hall,New+York,NY" //&center=latitude,logitude

	return (
		<div className="maps-container">
			<iframe
				frameBorder="0"
				referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/${MAP_MODE}?key=${API_KEY}&${PARAMETERS}`}
                className="embedded-map"
			></iframe>
		</div>
	);
}
