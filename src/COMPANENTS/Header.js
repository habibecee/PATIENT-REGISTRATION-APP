import * as React from "react";
import "../ASSETS/STYLES/GeneralStyle.css";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import { useSelector } from "react-redux";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import AdbIcon from "@mui/icons-material/Adb";

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = (props) => {
	const { patientState } = useSelector((state) => state);

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	// const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	// const handleOpenUserMenu = (event) => {
	// 	setAnchorElUser(event.currentTarget);
	// };

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	// const handleCloseUserMenu = () => {
	// 	setAnchorElUser(null);
	// };

	return (
		<AppBar position="static" className="AppBar">
			<Container maxWidth="xxl">
				<Toolbar disableGutters>
					<Diversity2TwoToneIcon
						sx={{
							display: { xs: "none", md: "flex" },
							mr: 5,
							fontSize: "2.5rem",
							color: "#3AB4F2",
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 20,
							display: { xs: "none", md: "flex" },

							fontWeight: 700,
							letterSpacing: "1rem",
							color: "#2192FF",
							textDecoration: "none",
							fontSize: "2rem",
						}}
					>
						hEaLtHiSh
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem className="closeNavMenu" onClick={handleCloseNavMenu}>
								<Link className="closeNavLinks" to="/">
									HOME
								</Link>
								<Link className="closeNavLinks" to="/patients">
									PATIENTS
									<span className="closeNavLinks">
										{" "}
										{patientState.patient.length}{" "}
									</span>
								</Link>

								{/* <Link className="closeNavLinks" to="/appointments">
									APPOINTMENTS
								</Link> */}
							</MenuItem>
						</Menu>
					</Box>
					<Diversity2TwoToneIcon
						sx={{
							display: { xs: "flex", md: "none" },
							mr: 1,
							color: "#3AB4F2",
						}}
					/>

					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "#2192FF",
							textDecoration: "none",
						}}
					>
						hEaLtHiSh
					</Typography>
					<Box
						className="NavbarLinkBox"
						onClick={handleCloseNavMenu}
						sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}
					>
						<Link className="NavLinks" to="/">
							HOME
						</Link>
						<Link className="NavLinks" to="/patients">
							PATIENTS
							<span
								style={{
									color: "orange",
									fontSize: ".8rem",
									// marginLeft: "-5px",
								}}
							>
								{" "}
								({patientState.patient.length})
							</span>
						</Link>

						{/* <Link className="NavLinks" to="/appointments">
							APPOINTMENTS
						</Link> */}
					</Box>
					<Button color="inherit" sx={{ fontSize: "1.5rem" }}>
						Log In
					</Button>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
