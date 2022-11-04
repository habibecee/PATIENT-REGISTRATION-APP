import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../COMPANENTS/Loading";
import AddTreatmentModal from "./companents/AddTreatmentModal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Diversity1Sharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const PatientDetails = (props) => {
	const { patientId } = useParams();
	const [patient, setPatient] = useState(null);
	const [patientProcess, setPatientProcess] = useState([]);
	const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
	const [selectedProcess, setSelectedProcess] = useState(null);
	const [didUpdate, setDidUpdate] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:3004/patient/${patientId}`)
			.then((resPatient) => {
				console.log(resPatient.data);
				setPatient(resPatient.data);
				axios
					.get("http://localhost:3004/process")
					.then((resProcess) => {
						const tempProcess = [];
						for (let i = 0; i < resPatient.data.processIds.length; i++) {
							const process = resProcess.data.find(
								(item) => item.id === resPatient.data.processIds[i]
							);
							tempProcess.push(process);
						}
						console.log(tempProcess);
						setPatientProcess(tempProcess);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, [didUpdate]);

	if (patient === null) {
		return <Loading />;
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div className="PageName">
				<h1> PATIENT DETAIL </h1>
			</div>
			<List
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					gap: "20px",
					width: "100%",
					maxWidth: 560,
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
						PATIENT'S INFOS
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
					PATIENT'S COMPLAINT:
				</ListSubheader>
				{patient?.process?.length === 0 ? (
					<ListItem>
						<ListItemText
							style={{ color: "blue" }}
							primary="There is no process to belong this patient."
						/>
					</ListItem>
				) : (
					<ListItem>
						{patientProcess?.map((process) => (
							<ul>
								<ListItem>
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
										<ListItem>
											<ListItemText primary="There is no treatment entered " />
											<Button
												style={{ marginLeft: "100px" }}
												onClick={() => {
													setOpenTreatmentModal(true);
													setSelectedProcess(process);
												}}
											>
												<AddCircleIcon style={{ color: "green" }} />
											</Button>
										</ListItem>
									</ul>
								) : (
									<ul>
										<ListItem>
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
										<ListItem>
											<ListItemText primary="There is no medicine entered." />
										</ListItem>
									</ul>
								) : (
									<ul>
										{process?.medicine?.map((medicine) => (
											<ListItem>
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
			<AddTreatmentModal
				open={openTreatmentModal}
				handleClose={() => setOpenTreatmentModal(false)}
				process={selectedProcess}
				didUpdate={didUpdate}
				setDidUpdate={setDidUpdate}
			/>
		</div>
	);
};

export default PatientDetails;
