import "./Slider.css";
import { TwoThumbInputRange } from "react-two-thumb-input-range";

export function NormSlider(props) {
	return (
		<div className="preferences-slider">
			<label htmlFor={props.id}>{props.name}</label>
			<input
				type="range"
				min={props.range.min}
				max={props.range.max}
				value={props.value}
				id={props.id}
				onChange={(event) => props.setValue(event.currentTarget.value)}
			/>
			<label htmlFor={props.id} className="slider-text-value">
				{props.value + " " + props.unit}
			</label>
		</div>
	);
}

export function WeightSlider(props) {
	return (
		<div className="preferences-weight-container">
			<label>{props.name}</label>
			<div className="preferences-weight-slider">
				<input
					type="range"
					min="0"
					max="1"
					step="0.25"
					value={props.value}
					onChange={(event) => props.setValue(event.currentTarget.value)}
				/>
			</div>
			<ul className="weight-slider-range-labels">
				<li className={0 == parseFloat(props.value) ? "active" : ""}>
					Irrelevant
				</li>
				<li className={0.25 == parseFloat(props.value) ? "active" : ""}>
					Not too relevant
				</li>
				<li className={0.5 == parseFloat(props.value) ? "active" : ""}>
					Neutral
				</li>
				<li className={0.75 == parseFloat(props.value) ? "active" : ""}>
					Important
				</li>
				<li className={1 == parseFloat(props.value) ? "active" : ""}>
					Very important
				</li>
			</ul>
		</div>
	);
}

export function DualSlider(props) {
	// where value is [min, max]
	return (
		<div className="preferences-dual-slider">
			<label>{props.name}</label>
			<TwoThumbInputRange
				onChange={(value) => {
					props.setValue(value);
				}}
				values={props.value}
				min={props.min}
				max={props.max}
				showLabels={false}
				inputStyle={{ height: "10px" }}
				trackColor="rgb(85, 38, 0)"
			/>
			<label>{props.value[0] + " - " + props.value[1]}</label>
		</div>
	);
}
