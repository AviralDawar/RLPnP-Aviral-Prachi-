import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-submenu/dist/index.css";
import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";


function App() {
  return (
    <>
      <Navbar style={{marginBottom: "2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar1</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdownMenu title="Dropdown 1" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar style={{marginBottom: "2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar2</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdownMenu title="Dropdown 2" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar style={{marginBottom: "2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar3</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdownMenu title="Dropdown 3" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar style={{marginBottom: "2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar4</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdownMenu title="Dropdown 4" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar style={{marginBottom: "2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar5</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdownMenu title="Dropdown 5" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar style={{marginBottom: "2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar6</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdownMenu title="Dropdown 6" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <DropdownSubmenu href="#action/3.7" title="Text to show">
                <NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
                <DropdownSubmenu href="#action/3.7" title="Text to show">
                  <NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default App;
