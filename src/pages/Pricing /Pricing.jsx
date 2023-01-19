import { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import { Card, Container, Row, Col } from "react-bootstrap"

const Pricing = () => {
	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)

	return (
		<>
			{user && (
				<Container fluid>
					<Row className="py-4">
						<Col className="d-flex justify-content-between align-items-center px-4">
							<h5 className="m-0">
								<img className="nav-icon me-3 mb-1" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670318446/favicon_rpvk1o.ico" alt="" />
								slake.
							</h5>
							<Link to="/dashboard" className="ms-3 purple-btn px-3 py-2" style={{ maxWidth: "max-content" }}>
								Dashboard
							</Link>
						</Col>
					</Row>
				</Container>
			)}
			<Container>
				<Row className="my-4">
					<h4>Pricing</h4>
				</Row>
				<Row className="pb-5">
					<h1>One tool for everything.</h1>
					<h1 className="pt-3">A new way to organize.</h1>
				</Row>
				<Row className="pricingCards justify-content-center">
					<Col className="p-0 m-0 d-flex justify-content-center" md={4}>
						<Card style={{ width: "18rem" }} className="mb-2">
							<Card.Header className={!darkMode ? "pricing-header" : "pricing-header-dark"}>
								<div className="d-flex gap-3 mt-3">
									<i className="pricing-icon bi bi-house-fill"></i>
									<h2>Free</h2>
								</div>
								<p>For organizing every corner of your work of life</p>
							</Card.Header>
							<Card.Body className={!darkMode ? "pricing-body" : "pricing-body-dark"}>
								<Card.Title>
									<h3>Free</h3>
								</Card.Title>
								<Card.Text>
									<ul className="mb-4">
										<li>
											<i className="bi bi-check-lg"></i>
											<p>Basic Note page.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>Only five Notes.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>To-do</p>
										</li>
									</ul>
									{!user ? (
										<Link to="/signup" className="purple-btn mb-3 px-4 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
											Get Started
										</Link>
									) : (
										<Link to="/dashboard" className="purple-btn mb-3 px-4 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
											Back to Dashboard
										</Link>
									)}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col className="p-0 m-0 d-flex justify-content-center" md={4}>
						<Card style={{ width: "18rem" }} className="mb-2">
							<Card.Header className={!darkMode ? "pricing-header" : "pricing-header-dark"}>
								<div className="d-flex gap-3 mt-3">
									<i className="pricing-icon bi bi-house-up-fill"></i>
									<h2>Plus</h2>
								</div>
								<p>For organizing every corner of your work of life and more!</p>
							</Card.Header>
							<Card.Body className={!darkMode ? "pricing-body" : "pricing-body-dark"}>
								<Card.Title>
									<h3>
										<i className="bi bi-currency-dollar"></i> 10
									</h3>
								</Card.Title>
								<Card.Text>
									<ul className="mb-4">
										<li>
											<i className="bi bi-check-lg"> </i>
											<p>Kan-Ban.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>Unlimited Notes.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>Personal space.</p>
										</li>
									</ul>
									{!user ? (
										<Link to="/signup" className="purple-btn mb-3 px-4 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
											Get Started
										</Link>
									) : (
										<Link to="/" className="purple-btn mb-3 px-4 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
											Get PRO
										</Link>
									)}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>

			{/* <Container fluid className={!darkMode ? "footer px-5 py-4" : "footer-dark px-5 py-4"}>
				©️ Developed by <a href="https://github.com/3Ryuusei3">Manuel Atance</a> and <a href="https://github.com/albertonaval">Alberto Naval</a>
			</Container> */}
		</>
	)
}

export default Pricing










