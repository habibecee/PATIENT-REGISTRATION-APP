import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../COMPANENTS/Loading";

const PatientDetails = (props) => {
	const { patientId } = useParams();
	const [patient, setPatient] = useState(null);
	const [patientProcess, setPatientProcess] = useState([]);

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
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, []);

	if (patient === null) {
		return <Loading />;
	}

	return (
		<div>
			<div className="PageName">
				<h1> PATIENT DETAIL </h1>
			</div>
			<div>
				<h3> {patient?.name} </h3>
			</div>
		</div>
	);
};

export default PatientDetails;
