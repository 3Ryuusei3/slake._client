import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Card, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Pricing = () => {
	const { user } = useContext(AuthContext)

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
					<h1>One tool for your whole life.</h1>
					<h1>A new way to organize.</h1>
				</Row>
				<Row className="justify-content-center">
					<Col className="p-0 m-0" md={4}>
						<Card style={{ width: "18rem" }} className="mb-2">
							<Card.Header className="pricing-header">
								<div className="d-flex gap-3 mt-3">
									<i className="pricing-icon bi bi-house-fill"></i>
									<h2>Free</h2>
								</div>
								<p>For organizing every corner of your work of life</p>
							</Card.Header>
							<Card.Body>
								<Card.Title>
									<h3>Free</h3>
								</Card.Title>
								<Card.Text>
									<ul className="mb-4">
										<li>
											<i className="bi bi-check-lg"> Basic Note page.</i>
										</li>
										<li>
											<i className="bi bi-check-lg"> Only five Notes.</i>
										</li>
										<li>
											<i className="bi bi-check-lg"> To-do</i>
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
					<Col className="p-0 m-0" md={4}>
						<Card style={{ width: "18rem" }} className="mb-2 pricing-card">
							<Card.Header className="pricing-header">
								<div className="d-flex gap-3 mt-3">
									<i className="pricing-icon bi bi-house-up-fill"></i>
									<h2>Plus</h2>
								</div>
								<p>For organizing every corner of your work of life and more!</p>
							</Card.Header>
							<Card.Body>
								<Card.Title>
									<h3>
										<i className="bi bi-currency-dollar"></i> 10
									</h3>
								</Card.Title>
								<Card.Text>
									<ul className="mb-4">
										<li>
											<i className="bi bi-check-lg"> Kan-Ban</i>
										</li>
										<li>
											<i className="bi bi-check-lg"> Unlimited Notes.</i>
										</li>
										<li>
											<i className="bi bi-check-lg"> Personal space</i>
										</li>
									</ul>
									{!user ? (
										<Link to="/signup" className="purple-btn mb-3 px-4 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
											Get Started
										</Link>
									) : (
										<Link to="/STRIPE" className="purple-btn mb-3 px-4 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
											Get PRO
										</Link>
									)}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Pricing
