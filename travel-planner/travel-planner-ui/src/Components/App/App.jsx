import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Plan from "../Plan/Plan";

export default function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/plan" element={<Plan />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
