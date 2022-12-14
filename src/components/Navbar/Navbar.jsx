import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom"

import { Container, Nav, Navbar } from "react-bootstrap"
import { DarkModeContext } from "../../context/darkmode.context"

const Navigation = () => {
	const { user } = useContext(AuthContext)
	const { darkMode, setDarkMode } = useContext(DarkModeContext)

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	return (
		<>
			{!user && (
				<Navbar collapseOnSelect expand="lg" bg={!darkMode ? "light" : "dark"} variant={!darkMode ? "light" : "dark"}>
					<Container fluid className="py-2">
						<Navbar.Brand>
							<Link to="/" className="brand-link py-2 px-3">
								<img className="nav-icon me-3 mb-1" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670318446/favicon_rpvk1o.ico" alt="" />
								<span style={!darkMode ? { color: "var(--text-primary)" } : { color: "var(--dark-text-primary)" }}>slake.</span>
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Link to="/plan" className={!darkMode ? "nav-btn" : "nav-btn-dark"}>
									<Nav.Link as="div">Pricing</Nav.Link>
								</Link>
								<Link to="/about" className={!darkMode ? "nav-btn" : "nav-btn-dark"}>
									<Nav.Link as="div">About</Nav.Link>
								</Link>
							</Nav>
							<Nav>
								<Link
									to="/"
									className={!darkMode ? "nav-btn" : "nav-btn-dark"}
									onClick={() => {
										toggleDarkMode()
									}}
								>
									<Nav.Link as="div">{!darkMode ? "Dark Mode" : "Light Mode"}</Nav.Link>
								</Link>
							</Nav>
							<Nav>
								<Link to="/login" className={!darkMode ? "nav-btn" : "nav-btn-dark"}>
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
