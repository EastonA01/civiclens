import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function TopNavbar({ onNavigate }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <div className="container-fluid">
        <Navbar.Brand><img src={'../../civiclensLogoWithTitle.png'} style={{ height: '4vh' }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="bg-body-tertiary">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/EastonA01/civiclens">GitHub</Nav.Link>
            <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => onNavigate('housing')}>Housing Vacancy</NavDropdown.Item>
              <NavDropdown.Item onClick={() => onNavigate('diversity')}>
                Ethnic Diversity
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onNavigate('age')}>
                Population Age
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onNavigate('structure')}>
                Family Structures
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default TopNavbar;