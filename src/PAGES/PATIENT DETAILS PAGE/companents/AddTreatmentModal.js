import React, { useState, useEffect } from "react";
import { Box, Modal, Button, TextField, Alert } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";
import { useDispatch } from "react-redux";
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

const AddTreatmentModal = (props) => {
	const { open, handleClose, Patient, process /*, didUpdate, setDidUpdate */ } =
		props;
	const dispatch = useDispatch();

	// const [medicineNo, setMedicineNo] = useState([1]);
	const [administeredTreatment, setAdministeredTreatment] = useState("");
	const [treatmentError, setTreatmentError] = useState(false);
	const [medicines, setMedicines] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		if (administeredTreatment === "") {
			setTreatmentError(true);
			setTimeout(() => {
				setTreatmentError(false);
			}, 3000);
			return;
		}

		const seperatedMedicines = medicines.split(",");
		console.log(seperatedMedicines);

		const updatedProcess = {
			...process,
			treatment: administeredTreatment,
			medicine: seperatedMedicines,
		};

		axios
			.put(`http://localhost:3004/process/${process.id}`, updatedProcess)
			.then((res) => {
				setAdministeredTreatment("");
				setMedicines("");
				handleClose();
				// setDidUpdate(!didUpdate);
				// setDidUpdate kullanılmasının amacı patientDetails sayfasındaki useEffectin her güncellemede tetiklenmesini sağlamak içindi.Detay sayfasını processState e bağladığıktan sonra gerek kalmadı!!
				dispatch({
					type: actionTypes.EDIT_PROCESS,
					payload: updatedProcess,
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Modal
				open={open}
				onClose={() => {
					handleClose();
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={style}
					// className="editModal"
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
							}}
						>
							<CancelIcon style={{ color: "red" }} fontSize="large" />
						</Button>
					</div>
					<h1 style={{ textAlign: "center" }}> ADD TREATMENT </h1>

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
								label="Administered Treatment"
								value={administeredTreatment}
								onChange={(event) =>
									setAdministeredTreatment(event.target.value)
								}
							/>
							{treatmentError && (
								<small style={{ width: "100%", marginTop: "-20px" }}>
									<Alert severity="error">This field can't be empty!</Alert>
								</small>
							)}

							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									// marginLeft: "75px",
									gap: "10px",
								}}
							>
								<TextField
									className=" editFormDiv"
									required
									id="outlined-required"
									label="Prescribed Medication"
									value={medicines}
									onChange={(event) => setMedicines(event.target.value)}
								/>

								<small style={{ color: "orangered" }}>
									{" "}
									* A comma (,) must be added between each drug.{" "}
								</small>
								{/* <Button onClick={() => setMedicineNo([...medicineNo, 1])}>
									<AddCircleIcon style={{ color: "green" }} />
								</Button> */}
							</div>

							{/* {medicines.map((item, index) => (
								<div
									key={index}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
										border: "1px solid black",
									}}
								>
									<span
										style={{
											textAlign: "center",
											marginTop: "5px",
											marginLeft: "10px",
										}}
									>
										{medicines}
									</span>

									<Button onClick={() => setMedicineNo([...medicineNo, -1])}>
										<RemoveCircleIcon style={{ color: "red" }} />
									</Button>
								</div>
							))} */}
						</div>
						<div>
							<Button type="submit" variant="contained" className="SaveBtn">
								SAVE
							</Button>
						</div>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default AddTreatmentModal;
