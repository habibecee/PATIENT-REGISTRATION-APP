import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Patients from "./PAGES/PATIENTS PAGE/Patients";
import AddPatient from "./PAGES/AddPatient";
import Header from "./COMPANENTS/Header";
import Footer from "./COMPANENTS/Footer";
import AddAppointment from "./PAGES/AddAppointment";
import PatientDetails from "./PAGES/PATIENT DETAILS PAGE/PatientDetails";
import api from "./API/api";
import urls from "./URLS/urls";
import { useDispatch } from "react-redux";
import actionTypes from "./REDUX/ACTIONS/actionTypes";
import AppointmentDetails from "./PAGES/APPOINTMENT DETAILS PAGE/AppointmentDetails";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: actionTypes.FETCH_PATIENT_START });

		api
			.get(urls.patient)
			.then((res) => {
				dispatch({
					type: actionTypes.FETCH_PATIENT_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.FETCH_PATIENT_FAIL,
					payload: "PATIENT DATA ERROR",
				});
			});

		dispatch({ type: actionTypes.FETCH_APPOINTMENT_START });

		api
			.get(urls.appointment)
			.then((res) => {
				dispatch({
					type: actionTypes.FETCH_APPOINTMENT_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.FETCH_APPOINTMENT_FAIL,
					payload: "APPOINTMENT DATA ERROR",
				});
			});

		dispatch({ type: actionTypes.FETCH_PROCESS_START });

		api
			.get(urls.process)
			.then((res) => {
				dispatch({
					type: actionTypes.FETCH_PROCESS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.FETCH_PROCESS_FAIL,
					payload: "PROCESS DATA ERROR",
				});
			});
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/patients" element={<Patients />} />
				<Route
					path="/patient-details/:patientId"
					element={<PatientDetails />}
				/>
				<Route
					path="/appointment-details/:appointmentId"
					element={<AppointmentDetails />}
				/>
				<Route path="/add-patient" element={<AddPatient />} />
				<Route path="/add-appointment" element={<AddAppointment />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
