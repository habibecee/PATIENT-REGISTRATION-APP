import React from "react";
import Header from "../COMPANENTS/Header";
import Loading from "../COMPANENTS/Loading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const AddPatient = (props) => {
	return (
		<div>
			<Header />
			<div className="PageName">
				<h1> ADD NEW PATIENT </h1>
			</div>
			<Box
				component="form"
				sx={{
					"& .MuiTextField-root": { m: 1, width: "40ch" },
				}}
				noValidate
				autoComplete="off"
			>
				<div className="formDiv">
					<div>
						<TextField required id="outlined-required" label="NAME" />
						<TextField required id="outlined-required" label="SURNAME" />
					</div>
					<div>
						<TextField required id="outlined-required" label="PHONE NUMBER" />
						<TextField
							id="outlined-helperText"
							label="NOTES"
							helperText="Important Notes"
						/>
					</div>
				</div>
			</Box>
		</div>
	);
};

export default AddPatient;
