import { Container, Nav, Navbar } from "react-bootstrap"

import { Link } from "react-router-dom"

function Navigation() {
	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
				<Container>
					<Navbar.Brand>
						<Link to="/" className="brand-link">
							slake.
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Link to="/pricing" className="nav-link">
								<Nav.Link as="div">Pricing</Nav.Link>
							</Link>
							<Link to="/about" className="nav-link">
								<Nav.Link as="div">About</Nav.Link>
							</Link>
						</Nav>
						<Nav>
							<Link to="/login" className="nav-link">
								<Nav.Link as="div">Log In</Nav.Link>
							</Link>
							<Link to="/signup" className="red-btn" style={{ maxWidth: "max-content" }}>
								<Nav.Link as="div">Try slake. for free</Nav.Link>
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Navigation
