import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import Slider from "../../components/Footer/Slider"

import Footer from "../../components/Footer/Footer"
import TrySlake from "../../components/Footer/TrySlake"

import { Card, Col, Container, Row } from "react-bootstrap"
import WOW from "wowjs"

const About = () => {
	const { darkMode } = useContext(DarkModeContext)
	const { user } = useContext(AuthContext)

	useEffect(() => {
		new WOW.WOW({
			live: false,
		}).init()
	}, [])

	return (
		<>
			{user && <Navigate to="/dashboard" />}
			<Container className="wow fadeInRight pt-2 pb-3" data-wow-duration="2s">
				<Row className="my-5">
					<h4>About</h4>
				</Row>
				<Row style={{ position: "relative" }}>
					<h1 className="pb-3">The History Of Slake.</h1>
					<p className="historyText">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ullam eos impedit alias labore provident numquam itaque recusandae exercitationem atque amet deleniti nihil, neque error
						commodi asperiores. Voluptate, nesciunt quia. Aliquid consectetur officia id sit consequatur ipsum et inventore debitis hic? Possimus voluptates sequi in necessitatibus? Quam aspernatur
						rerum veniam, dicta earum quaerat! Sapiente quae perferendis ab repellendus illo perspiciatis!
					</p>
					<p className="historyText">
						Possimus vitae mollitia facilis labore adipisci distinctio, velit delectus dolorem! Ab, obcaecati optio deserunt consequuntur iure animi dolor perferendis magnam debitis vel recusandae,
						veritatis, sapiente inventore. Provident assumenda minus voluptas!
					</p>
					<p className="historyText">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia quibusdam accusamus eveniet earum dicta commodi, accusantium nam id consequuntur quis iure asperiores, veritatis qui
						explicabo ea similique ipsum deserunt iste! Numquam a alias assumenda aut, minima deleniti quia asperiores ipsa. Eveniet nemo consequuntur dolorum repellat? Praesentium numquam cumque ex
						asperiores, ipsam saepe distinctio soluta, dolorum molestias unde mollitia repellendus ratione. Nemo recusandae numquam molestias sit vitae nesciunt quasi rerum earum est, accusantium enim
						facere dolor ea dolorum commodi eveniet dicta. Quo repudiandae repellendus magni! Expedita soluta ut dignissimos laudantium officia.
					</p>
					<p className="historyText">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. In error illum dicta eaque quisquam qui beatae voluptatem, dolorum odio iusto maiores nulla numquam autem rem placeat doloribus et
						laudantium perspiciatis!
					</p>
					<img className="aboutTextBackground mb-3" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1674388189/slakelogo_pczzsv.svg" alt="slake. icon" />
				</Row>
			</Container>
			<Slider />

			<Container fluid className={!darkMode ? "my-5 d-flex values wow fadeIn" : "my-2 d-flex values-dark wow fadeIn"} data-wow-duration="2s">
				<Container>
					<Row>
						<h1 className="aboutSectionTitle">Values</h1>
					</Row>
					<Row className="mb-3">
						<Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
							<h2>Curiosity.</h2>
							<p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
						</Col>
						<Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
							<h2>Adaptability</h2>
							<p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
						</Col>
						<Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
							<h2>Simplicity</h2>
							<p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
						</Col>
						<Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
							<h2>Impact</h2>
							<p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
						</Col>
					</Row>
				</Container>
			</Container>

			<Container className="pt-5">
				<Row>
					<h1 className="aboutSectionTitle">Our Team</h1>
				</Row>
				<Row className={!darkMode ? "my-5d-flex justify-content-center wow fadeInLeft" : "my-5 pb-4 d-flex justify-content-center wow fadeInLeft"} data-wow-duration="3s">
					<Col lg={{ span: 6 }} className="d-flex justify-content-center">
						<Card style={{ width: "20rem" }} className={!darkMode ? "profile-card" : "profile-card-dark"}>
							<Card.Header className="p-5">
								<Card.Img variant="top" src="https://avatars.githubusercontent.com/u/88399410?v=4" className={!darkMode ? "aboutCardImg" : "aboutCardImg-dark"} />
							</Card.Header>
							<Card.Body className={!darkMode ? "cardBody pt-4 pb-5" : "cardBody-dark pb-5"}>
								<Card.Title className="developerName">Manuel Atance</Card.Title>
								<Card.Text className="developerRole">Fullstack Developer</Card.Text>
							</Card.Body>
							<Card.Body className={!darkMode ? "cardBodyLink" : "cardBodyLink-dark"}>
								<Card.Link href="https://www.linkedin.com/in/manuel-atance/">
									<i className="bi bi-linkedin purpleLink"></i>
								</Card.Link>
								<Card.Link href="https://github.com/3Ryuusei3">
									<i className="bi bi-github purpleLink"></i>
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>

					<Col lg={{ span: 6 }} className="d-flex justify-content-center">
						<Card style={{ width: "20rem" }} className={!darkMode ? "profile-card" : "profile-card-dark"}>
							<Card.Header className="p-5">
								<Card.Img variant="top" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1673869820/Alberto_Naval_eegvyj.jpg" className={!darkMode ? "aboutCardImg" : "aboutCardImg-dark"} />
							</Card.Header>
							<Card.Body className={!darkMode ? " cardBody pt-4 pb-5" : "cardBody-dark pb-5"}>
								<Card.Title className="developerName">Alberto Naval</Card.Title>
								<Card.Text className="developerRole">Fullstack Developer</Card.Text>
							</Card.Body>
							<Card.Body className={!darkMode ? "cardBodyLink" : "cardBodyLink-dark"}>
								<Card.Link href="https://www.linkedin.com/in/alberto-naval/">
									<i className="bi bi-linkedin purpleLink"></i>
								</Card.Link>
								<Card.Link href="https://github.com/albertonaval">
									<i className="bi bi-github purpleLink"></i>
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<TrySlake />
			<Footer />
		</>
	)
}

export default About
