import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Patients from "./PAGES/Patients";
import AddPatient from "./PAGES/AddPatient";
import Header from "./COMPANENTS/Header";
import Footer from "./COMPANENTS/Footer";
import AddAppointment from "./PAGES/AddAppointment";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/patients" element={<Patients />} />
				<Route path="/add-patient" element={<AddPatient />} />
				<Route path="/add-appointment" element={<AddAppointment />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
