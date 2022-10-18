import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../COMPANENTS/Loading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "../../src/App.css";
import axios from "axios";

const AddPatient = (props) => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [note, setNote] = useState("");
	const [complaint, setComplaint] = useState("");
	const [patients, setPatients] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(" http://localhost:3004/patient")
			.then((res) => {
				setPatients(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("NAME", name);
		console.log("SURNAME", surname);
		console.log("PHONE", phone);

		if (name === "" || surname === "" || phone === "" || complaint === "") {
			alert(
				"IT IS MANDATORY TO FILL IN NAME, SURNAME AND PHONE NUMBER FIELDS!!! "
			);
			return;
		}

		if (phone.length !== 11) {
			alert("PHONE NUMBER CANNOT BE LESS THAN 11 DIGITS!!! ");
			return;
		}

		const hasNumber = patients.find((patient) => patient.phoneNumber === phone);
		console.log(hasNumber);

		if (hasNumber !== undefined) {
			alert("THIS PHONE NUMBER ALREADY BEEN REGISTERED!!! ");
			return;
		}

		const newProcess = {
			id: String(new Date().getTime() + 1),
			complaint: complaint,
			treatment: "",
			medicine: [],
		};

		axios
			.post(" http://localhost:3004/process", newProcess)
			.then((ProcessRes) => {
				const newPatient = {
					id: String(new Date().getTime()),
					name: name,
					surname: surname,
					phoneNumber: phone,
					notes: note,
					processIds: [newProcess.id],
				};
				console.log(newPatient);

				axios
					.post(" http://localhost:3004/patient", newPatient)
					.then((res) => {
						alert("NEW PATIENT IS SAVED SUCCESSFULLY");
						navigate("/patients");
					})
					.catch((err) => console.log("new Patient err", err));
			})
			.catch((ProcessErr) => console.log("ProcessErr", ProcessErr));
	};

	if (patients === null) {
		return <Loading />;
	}

	return (
		<>
			<div className="PageName">
				<h1> ADD NEW PATIENT </h1>
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
						id="outlined-required"
						label="NAME"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="SURNAME"
						value={surname}
						onChange={(event) => setSurname(event.target.value)}
					/>

					<TextField
						required
						type={"number"}
						id="outlined-required"
						label="PHONE NUMBER"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="COMPLAINT"
						value={complaint}
						onChange={(event) => setComplaint(event.target.value)}
					/>
					<TextField
						id="outlined-multiline-static"
						label="IMPORTANT NOTES"
						multiline
						rows={5}
						value={note}
						onChange={(event) => setNote(event.target.value)}
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
						SAVE NEW PATIENT
					</Button>
				</div>
			</Box>
		</>
	);
};

export default AddPatient;
