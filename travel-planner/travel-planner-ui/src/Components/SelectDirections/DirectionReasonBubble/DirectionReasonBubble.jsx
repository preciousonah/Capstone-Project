import "./DirectionReasonBubble.css";

export default function DirectionReasonBubble({ travelMode, reason, setOpen }) {
	return (
		<div className="direction-reason-bubble">
			<div className="direction-reason-top">
				<h3>{travelMode}</h3>
				<button
					onClick={() => {
						setOpen(false);
					}}
				>
					x
				</button>
			</div>
			<p>Reason: {reason}</p>
		</div>
	);
}
