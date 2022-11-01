import "../../ASSETS/STYLES/GeneralStyle.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../COMPANENTS/Loading";
import EditPatientModal from "./Companents/EditPatientModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { Button } from "@mui/material";

const Patients = (props) => {
	const navigate = useNavigate();
	const [patients, setPatients] = useState(null);
	// useState() içinde; eğer bir input için kullanılacaksa boş string ('')
	//  -çünkü inputun değeri genelde stringdir- vermek daha mantıklı iken,
	//  bir dizi için kullanılacaksa ya boş dizi [] ya da null verilmelidir.
	// Yani veri çekilecek işleme göre ayarlanmalı.

	const [appointments, setAppointments] = useState(null);

	const [updateCompanent, setUpdateCompanent] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(null);

	const handleClose = () => {
		setOpenEditModal(false);
	};

	// const cancelEdit = {
	// 	...patients,
	// };

	useEffect(() => {
		axios
			.get("http://localhost:3004/patient")
			.then((res) => {
				setPatients(res.data);
			})
			.catch((err) => console.log("patientErr", err));

		axios
			.get("http://localhost:3004/appointment")
			.then((res) => {
				setAppointments(res.data);
			})
			.catch((err) => console.log(err));
	}, [updateCompanent]);

	const handleDeletePatient = (patient) => {
		console.log(patient);

		const filteredAppointment = appointments.filter(
			(item) => item.patientId === patient.id
		);
		console.log("filteredAppointment", filteredAppointment);

		axios
			.delete(`http://localhost:3004/patient/${patient.id}`)
			.then((deleteRes) => {
				patient.processIds.forEach((processId) => {
					axios
						.delete(`http://localhost:3004/process/${processId}`)
						.then((processRes) => {})
						.catch((processErr) => console.log(processErr));
				});
				filteredAppointment.forEach((item) => {
					axios
						.delete(`http://localhost:3004/appointment/${item.id}`)
						.then((res) => {})
						.catch((err) => console.log(err));
				});

				setUpdateCompanent(!updateCompanent);
			})
			.catch((deleteErr) => console.log(deleteErr));
	};

	if (patients === null || appointments === null) {
		return <Loading />;
	}

	return (
		<>
			<div className="PageName">
				<h1> PATIENTS LIST </h1>
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
					onClick={() => navigate("/add-patient")}
					variant="contained"
					className="AddBtn"
				>
					ADD PATIENT
				</Button>
			</div>
			<TableContainer className="ListTableContainer">
				<Table sx={{ minWidth: "650px" }} aria-label="simple table">
					<TableHead sx={{ backgroundColor: "#BFA2DB" }}>
						<TableRow>
							<TableCell align="center"> NAME </TableCell>
							<TableCell align="center"> SURNAME</TableCell>
							<TableCell align="center">PHONE NUMBER </TableCell>
							<TableCell align="center">PROCESS </TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ backgroundColor: " #F0D9FF" }}>
						{patients.length === 0 && (
							<TableRow
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell colSpan={4} align="center">
									{" "}
									THERE IS NO REGISTERED PATIENT{" "}
								</TableCell>
							</TableRow>
						)}

						{patients.map((patient) => {
							return (
								<TableRow
									key={patient.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell align="center">{patient.name}</TableCell>
									<TableCell align="center">{patient.surname}</TableCell>
									<TableCell align="center">{patient.phoneNumber}</TableCell>
									<TableCell align="center">
										<Button onClick={() => handleDeletePatient(patient)}>
											<DeleteTwoToneIcon style={{ color: "red" }} />
										</Button>
										<Button
											onClick={() => {
												setOpenEditModal(true);
												setSelectedPatient(patient);
											}}
										>
											<CreateTwoToneIcon style={{ color: "gray" }} />
										</Button>
										<Button
											onClick={() => navigate(`/patient-details/${patient.id}`)}
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
			<EditPatientModal
				updateCompanent={updateCompanent}
				setUpdateCompanent={setUpdateCompanent}
				Patients={patients}
				Patient={selectedPatient}
				open={openEditModal}
				handleClose={handleClose}
			/>
		</>
	);
};

export default Patients;
