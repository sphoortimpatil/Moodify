import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
// import logo from "../assets/images/logo1.png";
import logo from "../assets/moodifyLogo.png";


const AppNavbar = () => {
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Container>
					<Navbar.Brand as={Link} to="/">
						<img
							alt=""
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							{/* <Nav.Link as={Link} to="/">
								Home
							</Nav.Link> */}

							<Nav.Link as={Link} to="/set-mood">
								Set Moood
							</Nav.Link>
							<Nav.Link as={Link} to="/scan-mood">
								Scan Mood
							</Nav.Link>
						</Nav>
						<Nav>
							{!window.sessionStorage.getItem("auth_token") && (
								<Nav.Link as={Link} to="/login">
									Spotify-Login
								</Nav.Link>
							)}
							{window.sessionStorage.getItem("auth_token") && (
								<Nav.Link as={Link} to="/logout">
									Spotify-Logout
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default AppNavbar;
