import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom"

import { Container, Nav, Navbar } from "react-bootstrap"

function Navigation() {
	const { user } = useContext(AuthContext)

	return (
		<>
			{!user && (
				<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
					<Container fluid className="py-2">
						<Navbar.Brand>
							<Link to="/" className="brand-link py-2 px-3">
								<img className="nav-icon me-3 mb-1" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670318446/favicon_rpvk1o.ico" alt="" />
								slake.
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Link to="/plan" className="nav-btn">
									<Nav.Link as="div">Pricing</Nav.Link>
								</Link>
								<Link to="/about" className="nav-btn">
									<Nav.Link as="div">About</Nav.Link>
								</Link>
							</Nav>
							<Nav>
								<Link to="/login" className="nav-btn">
									<Nav.Link as="div">Log In</Nav.Link>
								</Link>
								<Link to="/signup" className="ms-3 purple-btn" style={{ maxWidth: "max-content" }}>
									<Nav.Link as="div" className="px-3 text-light">
										Try slake. for free
									</Nav.Link>
								</Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</>
	)
}

export default Navigation
