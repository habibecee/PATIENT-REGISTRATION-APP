import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../ASSETS/STYLES/GeneralStyle.css";
import Loading from "../COMPANENTS/Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import InfoIcon from "@mui/icons-material/Info";
import api from "../API/api";
import urls from "../URLS/urls";
import { useDispatch } from "react-redux";
import actionTypes from "../REDUX/ACTIONS/actionTypes";
// import axios from "axios";

const Home = (props) => {
	const { patientState, appointmentState } = useSelector((state) => state);
	const [checkDate, setCheckDate] = useState(new Date());
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(() => {
			setCheckDate(new Date());
			// console.log("...setInterval");
		}, 20000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	var sortedAppointments = appointmentState.appointment?.sort(function (
		i1,
		i2
	) {
		return new Date(i2.date) - new Date(i1.date);
	});

	const today = new Date();
	//console.log("TODAY", today.getFullYear(), today.getMonth(), today.getDate());
	sortedAppointments = sortedAppointments.filter((item) => {
		const date = new Date(item.date);
		//console.log(date.getFullYear(), date.getMonth(), date.getDate());

		if (date.getFullYear() < today.getFullYear()) {
			return false;
		}

		if (
			date.getFullYear() === today.getFullYear() &&
			date.getMonth() < today.getMonth()
		) {
			return false;
		}

		if (
			date.getMonth() === today.getMonth() &&
			date.getDate() < today.getDate()
		) {
			return false;
		}
		return true;
	});

	const navigate = useNavigate();

	/* BEFORE REDUX START */

	// const [appointments, setAppointments] = useState(null);
	// const [patients, setPatients] = useState(null);

	// useEffect(() => {
	// 	axios
	// 		.get(" http://localhost:3004/appointment")
	// 		.then((resAppointments) => {
	// 			setAppointments(resAppointments.data);
	// 			axios
	// 				.get("http://localhost:3004/patient")
	// 				.then((resPatients) => {
	// 					setPatients(resPatients.data);
	// 				})
	// 				.catch((patientErr) => console.log("patientErr", patientErr));
	// 		})
	// 		.catch((appointmentERR) => console.log("appointmentERR", appointmentERR));
	// }, []);

	/* BEFORE REDUX FINISH */

	if (
		appointmentState.start === true ||
		appointmentState.fail === true ||
		patientState.start === true ||
		patientState.fail === true
	) {
		return <Loading />;
	}

	const deleteAppointment = (id) => {
		console.log(id);
		api
			.delete(`${urls.appointment}/${id}`)
			.then((res) => {
				dispatch({ type: actionTypes.DELETE_APPOINTMENT, payload: id });
			})
			.catch((err) => console.log(err));
	};

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
							<TableCell align="center">PROCESS & COMPLAINT </TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ backgroundColor: " #F0D9FF" }}>
						{appointmentState?.appointment?.length === 0 && (
							<TableRow
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell colSpan={5} align="center">
									{" "}
									THERE IS NO REGISTERED APPOINTMENT HERE{" "}
								</TableCell>
							</TableRow>
						)}

						{sortedAppointments.map((appointment) => {
							//(appointment,index ) şeklinde yazılabileceği gibi aşağıda TableRow içinde key olarak da tanımlanabilir.
							const searchPatient = patientState.patient?.find(
								(patient) => patient.id === appointment.patientId
							);

							const date = new Date(appointment.date);
							var isNear = false;
							//RANDEVU TARİHİ ŞU ANDAN DAHA BÜYÜK OLACAĞI İÇİN DATE, YANİ APPOİNTMENT.DATE - TODAY OLARAK ALIRIZ
							if (date.getTime() - checkDate.getTime() <= 300000) {
								isNear = true;
							}

							if (checkDate.getTime() - date.getTime() > 60000) isNear = false;
							return (
								<TableRow
									style={{ backgroundColor: isNear ? "#FFD372" : "#FFF5E4" }}
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
									<TableCell align="center">
										<Button onClick={() => deleteAppointment(appointment.id)}>
											<DeleteTwoToneIcon style={{ color: "red" }} />
										</Button>
										<Button>
											<CreateTwoToneIcon style={{ color: "gray" }} />
										</Button>
										<Button
											onClick={() =>
												navigate(`/appointment-details/${appointment.id}`)
											}
										>
											<InfoIcon style={{ color: "blue" }} />
										</Button>
									</TableCell>
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
