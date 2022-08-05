import "./Marker.css";
import { useEffect } from "react";
import { render } from "react-dom";
import Content from "./Content";
import axios from "axios";
import { PORT } from "./../App/App";

export default function Marker(props) {
	class InfoWindow extends google.maps.OverlayView {
		constructor(position) {
			super();

			this.position = position;
			this.new = true;

			const content = (
				<Content
					infoWindow={this}
					markerId={props.objectId}
					title={props.title}
					address={props.address}
					noteContent={props.content}
					setCurNote={props.setCurNote}
				/>
			);

			// Create the little arrow beneath the content.
			const bubbleAnchor = <div className="popup-bubble-anchor">{content}</div>;

			// Hold the content in a HTML node container to work with the Google Maps Javascript API
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

	useEffect(() => {
		const createMarker = async () => {
			// Problem! Cannot remove this since marker cannot be a useState
			// If marker is a useState, listeners cannot be added to it
			const marker = new google.maps.Marker(props); // create this separately, save this marker. Then in this useEffect, just create the listener

			props.setAllMapMarkers((prev) => [...prev, marker]);

			const popup = new InfoWindow(props.position);
			popup.setMap(props.map);
			popup.onRemove();

			marker.addListener("click", () => {
				popup.onAdd();
			});

			marker.addListener("dblclick", () => {
				// add to timeline on double click
				createTimelineItem(props.objectId);
			});

			return () => {
				marker.setMap(null);
			};
		};

		const createTimelineItem = async (markerId) => {
			if (props.timeline) {
				const res = await axios.post(
					`http://localhost:${PORT}/timelines/createEvent`,
					{
						markerId: markerId,
						timelineId: props.timeline.objectId,
					}
				);

				if (res.status === 200) {
					props.setTimelineItems((prev) => [...prev, res.data.item]);
					props.setTimelineMarkers((prev) => [...prev, res.data.marker]);
				}
			}
		};

		createMarker();
	}, [props.timeline]);

	return null;
}
