import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Patients from "./PAGES/Patients";
import AddPatient from "./PAGES/AddPatient";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/patients" element={<Patients />} />
				<Route path="/add-patient" element={<AddPatient />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
