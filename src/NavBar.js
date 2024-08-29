import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counter/userSlice";

const NavBar = () => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);


    const signOut = () => {
        auth.signOut();
        navigate("/");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Share My Bills</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Dashboard</Nav.Link>
                        <Nav.Link href="myhousehold">Household</Nav.Link>
                        <Nav.Link href="addbills">Add Bills</Nav.Link>
                        <NavDropdown title={`Hello, ${user.displayName}`} id="basic-nav-dropdown">
                            <NavDropdown.Item href="myaccount">My Account</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" onClick={() => signOut()}>
                                Sign Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;