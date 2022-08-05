import "./ToggleSwitch.css";

export default function ToggleSwitch(props) {
	return (
    <div className="preferences-toggle">
      <label>{props.name}</label>
			<label className="toggle-switch">
				<input type="checkbox" />
				<span className="toggle-switch-slider"></span>
			</label>
		</div>
	);
}
