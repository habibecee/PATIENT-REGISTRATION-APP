import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import api from "../../API/api";
import urls from "../../URLS/urls";

const AppointmentDetails = (props) => {
	const { appointmentId } = useParams();
	console.log(appointmentId);

	const [appointment, setAppointment] = useState("");
	const [patient, setPatient] = useState("");
	const [process, setProcess] = useState("");

	useEffect(() => {
		api
			.get(`${urls.appointment}/${appointmentId}`)
			.then((appointmentRes) => {
				console.log(appointmentRes.data);
				setAppointment(appointmentRes.data);

				api
					.get(`${urls.patient}/${appointmentRes.data.patientId}`)
					.then((patientRes) => {
						console.log(patientRes.data);
						setPatient(patientRes.data);

						api
							.get(urls.process)
							.then((processRes) => {
								console.log(processRes.data);

								let thisProcess = [];
								for (let i = 0; i < patientRes.data.processIds.length; i++) {
									for (let j = 0; j < processRes.data.length; j++) {
										if (
											patientRes.data.processIds[i] === processRes.data[j].id
										) {
											thisProcess.push(processRes.data[j]);
										}
									}
								}
								console.log("this process", thisProcess);
								setProcess(thisProcess);
							})
							.catch((processErr) => console.log(processErr));
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, []);

	if (appointment === "" || patient === "" || process === "") return null;

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div className="PageName">
					<h1> APPOINTMENT DETAILS </h1>
				</div>

				<List
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "center",
						gap: "20px",
						width: "100%",
						maxWidth: 1000,
						bgcolor: "#BCEAD5",
						position: "relative",
						overflow: "scroll",
						height: 550,
						padding: "30px",
						borderRadius: "20px",
						"& ul": { padding: 1 },
					}}
					subheader={<li />}
				>
					{" "}
					<ul style={{ marginTop: "100px" }}>
						<ListSubheader style={{ backgroundColor: "#DEF5E5" }}>
							APPOINTMENT DATE: {new Date(appointment.date).toLocaleString()}
						</ListSubheader>
						<ListItem>
							<ListItemText
								style={{ color: "blue", marginRight: "60px" }}
								primary="Patient's Name: "
							/>
							<ListItemText
								style={{ color: "blue" }}
								primary={patient?.name + "  " + patient?.surname}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								style={{ color: "blue" }}
								primary="Patient's Phone: "
							/>
							<ListItemText
								style={{ color: "blue" }}
								primary={patient?.phoneNumber}
							/>
						</ListItem>
					</ul>
					<ListSubheader style={{ backgroundColor: "#DEF5E5" }}>
						PATIENT'S PROCESS HISTORY ({process?.length}) :
					</ListSubheader>
					{patient?.process?.length === 0 ? (
						<ListItem
							sx={{
								// display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "20px",
							}}
						>
							<ListItemText
								style={{ color: "blue" }}
								primary="There is no process history for this patient."
							/>
						</ListItem>
					) : (
						<ListItem
							sx={
								{
									// display: "flex",
									// alignItems: "center",
									// justifyContent: "center",
									// gap: "20px",
								}
							}
						>
							{process?.map((process) => (
								<ul>
									<ListItem
										sx={
											{
												// display: "flex",
												// alignItems: "center",
												// justifyContent: "center",
												// gap: "20px",
												// overflow: "scroll",
											}
										}
									>
										<ListItemText
											style={{
												color: "red",
												textDecoration: "underline",
											}}
											primary={process?.complaint}
										/>
									</ListItem>
									<ListSubheader
										style={{
											backgroundColor: "#DEF5E5",
											listStyleType: "revert",
										}}
									>
										TREATMENT:
									</ListSubheader>
									{process?.treatment === "" ? (
										<ul>
											<ListItem
												sx={{
													// display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "20px",
												}}
											>
												<ListItemText primary="There is no treatment entered " />
												{/* <Button
													style={{ marginLeft: "100px" }}
													onClick={() => {
														setOpenTreatmentModal(true);
														setSelectedProcess(process);
													}}
												>
													<AddCircleIcon style={{ color: "green" }} />
												</Button> */}
											</ListItem>
										</ul>
									) : (
										<ul>
											<ListItem
												sx={{
													// display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "20px",
												}}
											>
												<ListItemText primary={process?.treatment} />
											</ListItem>
										</ul>
									)}

									<ListSubheader
										style={{
											backgroundColor: "#DEF5E5",
											listStyleType: "revert",
										}}
									>
										MEDICINE:
									</ListSubheader>

									{process?.medicine?.length === 0 ? (
										<ul>
											<ListItem
												sx={{
													// display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "20px",
												}}
											>
												<ListItemText primary="There is no medicine entered." />
											</ListItem>
										</ul>
									) : (
										<ul>
											{process?.medicine?.map((medicine) => (
												<ListItem
													sx={{
														// display: "flex",
														alignItems: "center",
														justifyContent: "center",
														gap: "20px",
													}}
												>
													<ListItemText primary={medicine} />
												</ListItem>
											))}
										</ul>
									)}
								</ul>
							))}
						</ListItem>
					)}
				</List>
				{/* <AddTreatmentModal /> */}
			</div>
		</>
	);
};

export default AppointmentDetails;
