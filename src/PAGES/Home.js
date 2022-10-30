import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ASSETS/STYLES/GeneralStyle.css";
import Loading from "../COMPANENTS/Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import axios from "axios";

const Home = (props) => {
	const navigate = useNavigate();
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
		<>
			<div className="PageName">
				<h1> HOME </h1>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					marginBottom: "30px",
					marginRight: "20px",
				}}
			>
				<Button
					onClick={() => navigate("/add-appointment")}
					variant="contained"
					className="AddBtn"
				>
					ADD NEW APPOINTMENT
				</Button>
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
						{appointments.length === 0 && (
							<TableRow
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell colSpan={5} align="center">
									{" "}
									THERE IS NO REGISTERED APPOİNTMENT HERE{" "}
								</TableCell>
							</TableRow>
						)}

						{appointments.map((appointment) => {
							//(appointment,index ) şeklinde yazılabileceği gibi aşağıda TableRow içinde key olarak da tanımlanabilir.
							const searchPatient = patients.find(
								(patient) => patient.id === appointment.patientId
							);
							return (
								<TableRow
									key={appointment?.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										{new Date(appointment?.date).toLocaleString()}
									</TableCell>
									<TableCell align="center">{searchPatient?.name}</TableCell>
									<TableCell align="center">{searchPatient?.surname}</TableCell>
									<TableCell align="center">
										{searchPatient?.phoneNumber}
									</TableCell>
									<TableCell align="center">BUTTONS</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Home;

// {
// 	"id": "1",
// 	"date": "17.09.2022",
// 	"patientId": "1666095545053"
//   }
