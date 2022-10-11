import React, { useEffect, useState } from "react";
import "../ASSETS/STYLES/GeneralStyle.css";
import Loading from "../COMPANENTS/Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const Home = (props) => {
	const [appointments, setAppointments] = useState(null);
	const [patients, setPatients] = useState(null);

	useEffect(() => {
		axios
			.get(" http://localhost:3004/appointment")
			.then((resAppointments) => {
				setAppointments(resAppointments.data);
				axios
					.get("http://localhost:3004/patient")
					.then((resPatients) => {
						setPatients(resPatients.data);
					})
					.catch((patientErr) => console.log("patientErr", patientErr));
			})
			.catch((appointmentERR) => console.log("appointmentERR", appointmentERR));
	}, []);

	if (appointments === null || patients === null) {
		return <Loading />;
	}

	return (
		<div>
			<div className="PageName">
				<h1> HOME </h1>
			</div>
			<TableContainer className="ListTableContainer">
				<Table sx={{ minWidth: "650px" }} aria-label="simple table">
					<TableHead sx={{ backgroundColor: "#BFA2DB" }}>
						<TableRow>
							<TableCell align="center"> DATE </TableCell>
							<TableCell align="center"> NAME </TableCell>
							<TableCell align="center"> SURNAME</TableCell>
							<TableCell align="center">PHONE NUMBER </TableCell>
							<TableCell align="center">PROCESS </TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ backgroundColor: " #F0D9FF" }}>
						{appointments.map((appointment) => {
							//(appointment,index ) şeklinde yazılabileceği gibi aşağıda TableRow içinde key olarak da tanımlanabilir.
							const searchPatient = patients.find(
								(patient) =>
									patient.id === appointment.patientId ||
									patient.id !== undefined
							);
							return (
								<TableRow
									key={appointment.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										{appointment.date}
									</TableCell>
									<TableCell align="center">{searchPatient.name}</TableCell>
									<TableCell align="center">{searchPatient.surname}</TableCell>
									<TableCell align="center">
										{searchPatient.phoneNumber}
									</TableCell>
									<TableCell align="center">BUTTONS</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Home;
