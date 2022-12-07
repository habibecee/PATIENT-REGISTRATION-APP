import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../API/api";
import urls from "../../URLS/urls";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import actionTypes from "../../REDUX/ACTIONS/actionTypes";

const EditAppointment = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { appointmentId } = useParams();
	const [appointments, setAppointments] = useState(null);
	const [appointment, setAppointment] = useState(null);
	const [patients, setPatients] = useState(null);
	const [patient, setPatient] = useState(null);
	const [process, setProcess] = useState(null);
	// const [name, setName] = useState("");
	// const [surname, setSurname] = useState("");
	// const [phone, setPhone] = useState("");
	const [complaint, setComplaint] = useState("");
	const [date, setDate] = useState(/*dayjs("mm.dd.yyyy hh:mm")*/ "");
	const [hasPatient, setHasPatient] = useState(false);

	useEffect(() => {
		api
			.get(urls.appointment)
			.then((res) => {
				//console.log(res.data);
				setAppointments(res.data);
				const tempAppointment = res.data?.find(
					(item) => item.id === appointmentId
				);
				setAppointment(tempAppointment);
				//console.log(appointment);

				api
					.get(urls.patient)
					.then((patientRes) => {
						setPatients(patientRes.data);
						const tempPatient = patientRes.data?.find(
							(item) => item.id === tempAppointment.patientId
						);
						setPatient(tempPatient);

						//console.log(patient);

						api
							.get(urls.process)
							.then((processRes) => {
								const tempProcess = processRes.data?.find(
									(item) => item.id == tempPatient.processIds
								);
								setProcess(tempProcess);
								setDate(appointment?.date);
								// setName(patient?.name);
								// setSurname(patient?.surname);
								// setPhone(patient?.phoneNumber);
								setComplaint(process?.complaint);
							})
							.catch((processErr) => console.log(processErr));
					})
					.catch((patientErr) => console.log(patientErr));
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (date === "" || complaint === "") {
			alert("YOU MUST BE FILLED ALL FIELD THAT IN THIS FORM!!!");
			return;
		}

		const filteredAppointments = appointments.filter(
			(item) => item.id !== appointment.id
		);
		const isAvaliableDate = filteredAppointments.find(
			(item) => item.date == date
		);

		if (isAvaliableDate !== undefined) {
			alert("This date and time is not available. Please select another one.");
			return;
		}

		const updatedAppointment = {
			...appointment,
			date: date,
		};

		api
			.put(`${urls.appointment}/${appointment.id}`, updatedAppointment)
			.then((resAppointment) => {
				dispatch({
					type: actionTypes.EDIT_APPOINTMENT,
					payload: updatedAppointment,
				});

				const updatedProcess = {
					...process,
					complaint: complaint,
				};
				api
					.put(`${urls.process}/${process.id}`, updatedProcess)
					.then((resProcess) => {
						dispatch({
							type: actionTypes.EDIT_PROCESS,
							payload: updatedProcess,
						});
					})
					.catch((errProcess) => console.log(errProcess));

				navigate("/");
			})
			.catch((errAppointment) => console.log(errAppointment));
	};

	if (!appointments || !appointment || !patients || !patients || !process) {
		return null;
	}

	return (
		<>
			<div className="PageName">
				<h1> EDIT APPOINTMENT </h1>
			</div>
			<Box
				className="formDiv"
				component="form"
				sx={{
					"& .MuiTextField-root": { m: 1, width: "55ch" },
				}}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<div className="formDiv">
					<TextField
						required
						label="DATE OF THE APPOINTMENT"
						value={date}
						defaultValue={appointment.date}
						onChange={(event) => setDate(event.target.value)}
						type={"datetime-local"}
					/>

					<TextField
						// required
						type={"number"}
						id="outlined-required"
						label="PHONE NUMBER"
						value={patient.phoneNumber}
						disabled={hasPatient}
					/>
					<TextField
						required
						id="outlined-required"
						label="NAME"
						value={patient.name}
						disabled={hasPatient}
					/>
					<TextField
						required
						id="outlined-required"
						label="SURNAME"
						value={patient.surname}
						disabled={hasPatient}
					/>
					<TextField
						required
						id="outlined-required"
						label="COMPLAINT"
						defaultValue={process.complaint}
						onChange={(event) => setComplaint(event.target.value)}
					/>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "flex-end",
						marginLeft: "15%",
					}}
				>
					<Button type="submit" variant="contained" className="SaveBtn">
						EDIT APPOINTMENT
					</Button>
				</div>
			</Box>
		</>
	);
};

export default EditAppointment;
