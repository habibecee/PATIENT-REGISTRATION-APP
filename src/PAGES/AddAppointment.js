import React, { useEffect, useState } from "react";
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
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [complaint, setComplaint] = useState("");
	const [date, setDate] = React.useState(dayjs(""));
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

	const handlePhoneChange = (event) => {
		setPhone(event.target.value);

		const searchPatient = patients.find(
			(item) => item.phoneNumber === String(event.target.value)
		);
		console.log("searchPatient", searchPatient);

		if (searchPatient !== undefined) {
			setName(searchPatient.name);
			setSurname(searchPatient.surname);
			setHasPatient(true);
		} else {
			setName("");
			setSurname("");
			setHasPatient(searchPatient);
		}
	};

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
				date: date,
				patientId: hasPatient.id,
			};
			console.log("newAppointment", newAppointment);
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
						label="Pick The Appointment Date"
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
