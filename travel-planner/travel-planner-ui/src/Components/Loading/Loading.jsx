import "./Loading.css";

export default function Loading() {
	return (
		<div className="loading-div">
			<h1 className="loading">Loading...</h1>
			<div className="lds-roller">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
