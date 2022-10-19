import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../COMPANENTS/Loading";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "../../src/App.css";
import axios from "axios";

const AddAppointment = (props) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [complaint, setComplaint] = useState("");
	const [date, setDate] = React.useState(dayjs());
	const [patients, setPatients] = useState(null);
	const [hasPatient, setHasPatient] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:3004/patient")
			.then((res) => {
				setPatients(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(date);

		if (
			dayjs === "" ||
			phone === "" ||
			name === "" ||
			surname === "" ||
			complaint === ""
		) {
			alert("YOU MUST BE FILLED ALL FIELD THAT IN THIS FORM!!!");
			return;
		}

		if (phone.length !== 11) {
			alert("PHONE NUMBER IS WRONG!");
			return;
		}

		if (hasPatient) {
			const newAppointment = {
				id: String(new Date().getTime()),
				date: String(date),
				patientId: hasPatient.id,
			};

			const newProcess = {
				id: String(new Date().getTime() + 1),
				complaint: complaint,
				treatment: "",
				medicine: [],
			};

			const updatedPatient = {
				...hasPatient,
				processIds: [...hasPatient.processIds, newProcess.id],
			};

			axios
				.post("http://localhost:3004/appointment", newAppointment)
				.then((res) => {
					console.log("randevu kayıt", res);
				})
				.catch((err) => console.log(err));

			console.log("newAppointment", newAppointment);
			axios
				.post("http://localhost:3004/process", newProcess)
				.then((response) => {
					console.log("işlem kayıt", response);
				})
				.catch((error) => console.log(error));

			axios
				.put(`http://localhost:3004/patient/${hasPatient.id}`, updatedPatient)
				.then((ress) => {
					console.log("hasta update", ress);
				})
				.catch((errr) => console.log("errrr", errr));

			navigate("/");
		} else {
			const newProcess = {
				id: String(new Date().getTime()),
				complaint: complaint,
				treatment: "",
				medicine: [],
			};

			const newPatient = {
				id: String(new Date().getTime() + 1),
				name: name,
				surname: surname,
				phoneNumber: phone,
				processIds: [newProcess.id],
			};

			const newAppointment = {
				id: String(new Date().getTime() + 2),
				date: String(date),
				patientId: newPatient.id,
			};

			axios
				.post("http://localhost:3004/appointment", newAppointment)
				.then((res) => {
					console.log("randevu kayıt", res);
				})
				.catch((err) => console.log(err));

			console.log("newAppointment", newAppointment);
			axios
				.post("http://localhost:3004/process", newProcess)
				.then((response) => {
					console.log("işlem kayıt", response);
				})
				.catch((error) => console.log(error));

			axios
				.post("http://localhost:3004/patient", newPatient)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));

			navigate("/");
		}
	};

	const handlePhoneChange = (event) => {
		setPhone(event.target.value);

		const searchPatient = patients.find(
			(item) => item.phoneNumber === String(event.target.value)
		);
		console.log("searchPatient", searchPatient);

		if (searchPatient !== undefined) {
			setName(searchPatient.name);
			setSurname(searchPatient.surname);
			setHasPatient(searchPatient);
		} else {
			setName("");
			setSurname("");
			setHasPatient(false);
		}
	};

	if (patients === null) {
		return <Loading />;
	}

	return (
		<>
			<div className="PageName">
				<h1> ADD NEW APPOINTMENT </h1>
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
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						renderInput={(props) => <TextField {...props} />}
						label="Pick The Appointment"
						value={date}
						defaultValue={new Date("dd/mm/yyyy hh/mm")}
						onChange={(event) => {
							setDate(event);
						}}
					/>
				</LocalizationProvider>
				<div className="formDiv">
					<TextField
						required
						type={"number"}
						id="outlined-required"
						label="PHONE NUMBER"
						value={phone}
						onChange={handlePhoneChange}
					/>
					<TextField
						required
						id="outlined-required"
						label="NAME"
						value={name}
						onChange={(event) => setName(event.target.value)}
						disabled={hasPatient}
					/>
					<TextField
						required
						id="outlined-required"
						label="SURNAME"
						value={surname}
						onChange={(event) => setSurname(event.target.value)}
						disabled={hasPatient}
					/>
					<TextField
						required
						id="outlined-required"
						label="COMPLAINT"
						value={complaint}
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
						SAVE NEW APPOINTMENT
					</Button>
				</div>
			</Box>
		</>
	);
};

export default AddAppointment;
