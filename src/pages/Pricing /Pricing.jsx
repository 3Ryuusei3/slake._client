import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import Slider from "../../components/Footer/Slider"

import { Card, Container, Row, Col } from "react-bootstrap"
import WOW from "wowjs"
import Footer from "../../components/Footer/Footer"
import TrySlake from "../../components/Footer/TrySlake"

const Pricing = () => {
	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)

	useEffect(() => {
		new WOW.WOW({
			live: false,
		}).init()
	}, [])

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
			<Container className="py-2 wow fadeInRight" data-wow-duration="2s">
				<Row className="mt-5 mb-4">
					<h4>Pricing</h4>
				</Row>
				<Row className="pb-4">
					<h1 className="pricingTitle">One tool for everything. A new way to organize.</h1>
				</Row>
			</Container>
			<Container className="py-2 wow fadeInLeft" data-wow-duration="2s">
				<Row className="mt-3 pricingCards justify-content-center">
					<Col className="p-0 m-0 d-flex justify-content-center">
						<Card style={{ width: "20rem" }} className="mb-2">
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
											<p>Up to 100 Notes.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>To-do & Kanban.</p>
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
					<Col className="p-0 m-0 d-flex justify-content-center">
						<Card style={{ width: "20rem" }} className="mb-2">
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
											<p>Calendar.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>Unlimited Notes.</p>
										</li>
										<li>
											<i className="bi bi-check-lg"></i>
											<p>Pomodoro.</p>
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
			<Slider />
			<TrySlake />
			<Footer />
		</>
	)
}

export default Pricing
