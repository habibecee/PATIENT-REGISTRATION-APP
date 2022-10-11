import React from "react";
import "../ASSETS/STYLES/GeneralStyle.css";
import Container from "@mui/material/Container";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Footer = (props) => {
	return (
		<Paper
			className="AppBar"
			sx={{ marginTop: "calc(45%)", bottom: 0 }}
			component="footer"
			square
			variant="outlined"
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						flexGrow: 1,
						justifyContent: "center",
						display: "flex",
						my: 1,
					}}
				>
					<Diversity2TwoToneIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
				</Box>

				<Box
					sx={{
						flexGrow: 1,
						justifyContent: "center",
						display: "flex",
						mb: 2,
					}}
				>
					<Typography variant="caption" color="initial">
						Copyright ©2022. [] Limited
					</Typography>
				</Box>
			</Container>
		</Paper>
	);
};

export default Footer;
