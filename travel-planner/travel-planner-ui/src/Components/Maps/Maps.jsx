import "./Maps.css";
import { useEffect, useRef, useState, createElement, Component } from "react";
import { render } from "react-dom";

export default function Maps({ searchOnChange, searchTerm, setCurNote }) {
	class Popup extends google.maps.OverlayView {
		constructor(position, adjustTitle, setAdjustTitle, curTitle, setCurTitle) {
			super();

			this.position = position;
			this.new = true;

			const content = (
				<div className="info-window-content popup-bubble" id={`${curTitle}`}>
					<div className="info-window-top-container">
						{adjustTitle ? (
							<input
								className="info-window-title"
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										setAdjustTitle(false);
									}
								}}
								onChange={(event) => setCurTitle(event.currentTarget.value)}
								value={curTitle}
							/>
						) : (
							<h2
								onDoubleClick={() => setAdjustTitle(true)}
								className="info-window-title"
							>
								{curTitle}
							</h2>
						)}
						<button
							onClick={() => this.onRemove(this)}
							className="close-info-window-button"
						>
							x
						</button>
					</div>
					<p>Address: from search term or inverse geocode?</p>
					<div className="info-window-note">
						<button> Open Note </button>
					</div>
				</div>
			);

			const bubbleAnchor = createElement(
				"div",
				{ className: "popup-bubble-anchor" },
				content
			);

			this.containerDiv = document.createElement("div");
			this.containerDiv.classList.add("popup-container");
			this.containerDiv.style.display = "none";

			render(bubbleAnchor, this.containerDiv);
		}

		onAdd() {
			// This function is automatically called when the popup is added to the map
			if (this.new) {
				this.new = false;
			} else {
				this.getPanes().floatPane.appendChild(this.containerDiv);
			}
		}

		onRemove(newThis = this) {
			// Automatically called when popup is removed from the map

			if (newThis.containerDiv.parentElement) {
				newThis.containerDiv.parentElement.removeChild(newThis.containerDiv);
			}
		}

		draw() {
			// Called each frame when the popup needs to draw itself

			const newDivPosition = this.getProjection().fromLatLngToDivPixel(
				this.position
			);

			// Hide the popup when it is out of view
			const display =
				Math.abs(newDivPosition.x) < 4000 && Math.abs(newDivPosition.y) < 4000
					? "block"
					: "none";

			if (display === "block") {
				this.containerDiv.style.left = newDivPosition.x + "px";
				this.containerDiv.style.top = newDivPosition.y + "px";
			}

			if (this.containerDiv.style.display !== display) {
				this.containerDiv.style.display = display;
			}
		}
	}

	const ref = useRef(null);
	const [map, setMap] = useState();

	const mapInit = () => {
		useEffect(() => {
			console.log("Map rerendered!");
			if (ref.current && !map) {
				setMap(
					new window.google.maps.Map(ref.current, {
						center: { lat: 30, lng: 0 }, // by default
						zoom: 3,
					})
				);
			}
		}, [ref, map]);

		const image =
			"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"; // test image of a flag so we can see where the pin is!

		// map.addListener("click", (event) => {
		// 	map.panTo(event.latLng)
		// })

		return (
			<div
				id="displayed-map"
				ref={ref}
				style={{ flexGrow: "1", height: "100%" }}
			>
				{createNewMarker({
					position: { lat: 37.499468, lng: -122.143871 },
					title: "MPK Office",
					icon: image,
					map: map,
				})}
			</div>
		);
	};

	const createNewMarker = (options) => {
		const [adjustTitle, setAdjustTitle] = useState(false);
		const [curTitle, setCurTitle] = useState(options.title);

		useEffect(() => {
			const marker = new google.maps.Marker(options);

			const popup = new Popup(
				options.position,
				adjustTitle,
				setAdjustTitle,
				curTitle,
				setCurTitle
			);
			popup.setMap(map);
			popup.onRemove();

			marker.addListener("click", () => {
				popup.onAdd();
			});

			return () => {
				marker.setMap(null);
			};
		}, [options]);

		return null;
	};

	return (
		<div className="maps-container">
			<div className="maps-search">
				<input
					onChange={(event) => searchOnChange(event.target.value)}
					value={searchTerm}
					placeholder="Search"
				></input>
			</div>

			{mapInit()}
		</div>
	);
}
