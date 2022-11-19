import React, { useState, useEffect } from "react";
import { Box, Modal, Button, TextField, Alert } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../../../REDUX/ACTIONS/actionTypes";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "40vw",
	height: "30vw",
	overflowY: "scroll",
	bgcolor: "#FFD6EC",
	border: ".5px solid #000",
	boxShadow: 24,
	p: 4,
};

const EditPatientModal = (props) => {
	const dispatch = useDispatch();
	const { patientState } = useSelector((state) => state);
	const {
		open,
		handleClose,
		Patient,
		// Patients,
		// updateCompanent,
		// setUpdateCompanent,
	} = props;
	const [name, setName] = useState(Patient?.name);
	const [hasNameError, setHasNameError] = useState(false);
	const [surname, setSurname] = useState(Patient?.surname);
	const [hasSurnameError, setHasSurnameError] = useState(false);
	const [phone, setPhone] = useState(Patient?.phoneNumber);
	const [hasPhoneError, setHasPhoneError] = useState(false);
	const [phoneErr, setPhoneErr] = useState(false);
	const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
	const [note, setNote] = useState(Patient?.notes);

	useEffect(() => {
		setName(Patient?.name);
		setSurname(Patient?.surname);
		setPhone(Patient?.phoneNumber);
		setNote(Patient?.notes);
	}, [Patient]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (name === "") {
			setHasNameError(true);
			setTimeout(() => {
				setHasNameError(false);
			}, 3000);
			return;
		}

		if (surname === "") {
			setHasSurnameError(true);
			setTimeout(() => {
				setHasSurnameError(false);
			}, 3000);
			return;
		}

		if (phone === "") {
			setHasPhoneError(true);
			setPhoneErrorMessage("This field can't be empty!");
			setTimeout(() => {
				setHasPhoneError(false);
				setPhoneErrorMessage("");
			}, 3000);
			return;
		}

		if (phone.length !== 11) {
			setPhoneErr(true);
			setPhoneErrorMessage("Phone number must be 11 digits!");
			setTimeout(() => {
				setPhoneErr(false);
				setPhoneErrorMessage("");
			}, 3000);
			return;
		}

		const filteredPatients = patientState.patient?.filter(
			(item) => item.phoneNumber !== Patient.phoneNumber
		);

		const hasNumber = filteredPatients?.find(
			(patient) => patient.phoneNumber === phone
		);
		console.log("hasNumber???", hasNumber);

		if (hasNumber !== undefined) {
			alert("THIS PHONE NUMBER ALREADY BEEN REGISTERED!!! ");
			return;
		}

		const updatedPatient = {
			...Patient,
			name: name,
			surname: surname,
			phoneNumber: phone,
			notes: note,
		};

		console.log("updatedPatient", updatedPatient);

		axios
			.put(`http://localhost:3004/patient/${Patient.id}`, updatedPatient)
			.then((res) => {
				dispatch({
					type: actionTypes.EDIT_PATIENT,
					payload: updatedPatient,
				});
				handleClose();

				// setUpdateCompanent(!updateCompanent);
			})
			.catch((err) => console.log("err update patient", err));
	};

	return (
		<>
			<Modal
				open={open}
				onClose={() => {
					handleClose();
					setName(Patient.name);
					setSurname(Patient.surname);
					setPhone(Patient.phoneNumber);
					setNote(Patient.notes);
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={style}
					//  className="editModal"
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							marginTop: "-20px",
							marginRight: "-20px",
						}}
					>
						<Button
							onClick={() => {
								handleClose();
								setName(Patient.name);
								setSurname(Patient.surname);
								setPhone(Patient.phoneNumber);
								setNote(Patient.notes);
							}}
						>
							<CancelIcon style={{ color: "red" }} fontSize="large" />
						</Button>
					</div>
					<h1 style={{ textAlign: "center" }}> EDIT PATIENT'S INFORMATIONS </h1>

					<Box
						className="formDiv"
						component="form"
						sx={{
							"& .MuiTextField-root": { m: 1, width: "35ch" },
						}}
						noValidate
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<div className="formDiv">
							<TextField
								className=" editFormDiv"
								required
								id="outlined-required"
								label="NAME"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
							{hasNameError && (
								<small style={{ width: "100%", marginTop: "-20px" }}>
									<Alert severity="error">This field can't be empty!</Alert>
								</small>
							)}
							<TextField
								className=" editFormDiv"
								required
								id="outlined-required"
								label="SURNAME"
								value={surname}
								onChange={(event) => setSurname(event.target.value)}
							/>
							{hasSurnameError && (
								<small style={{ width: "100%", marginTop: "-20px" }}>
									<Alert severity="error">This field can't be empty!</Alert>
								</small>
							)}

							<TextField
								className=" editFormDiv"
								required
								type={"number"}
								id="outlined-required"
								label="PHONE NUMBER"
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
							/>

							{hasPhoneError && (
								<small style={{ width: "100%", marginTop: "-20px" }}>
									<Alert severity="error">{phoneErrorMessage}</Alert>
								</small>
							)}

							{phoneErr && (
								<small style={{ width: "100%", marginTop: "-20px" }}>
									<Alert severity="warning">{phoneErrorMessage}</Alert>
								</small>
							)}

							<TextField
								className=" editFormDiv"
								id="outlined-multiline-static"
								label="IMPORTANT NOTES"
								multiline
								rows={3}
								value={note}
								onChange={(event) => setNote(event.target.value)}
							/>
						</div>
						<div>
							<Button type="submit" variant="contained" className="SaveBtn">
								EDIT PATIENT
							</Button>
						</div>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default EditPatientModal;
