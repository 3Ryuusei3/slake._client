import { useContext, useEffect } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import WOW from "wowjs"

function Homepage() {
	const { darkMode } = useContext(DarkModeContext)

	useEffect(() => {
		new WOW.WOW({
			live: false,
		}).init()
	}, [])

	return (
		<>
			<Container className="py-5">
				<Row className="mt-5 pb-5 align-items-center justify-content-lg-end wow fadeInUp " data-wow-duration="2s">
					<Col lg={{ span: 7 }} className="text-center">
						<div className="d-flex my-5 pb-5">
							<img src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670317681/undraw_experience_design_re_ca7l_bgrfu1.svg" alt="Team" width="100%" />
						</div>
					</Col>
					<Col lg={{ span: 5 }} className="text-center d-flex justify-content-lg-end justify-content-md-center pb-5 mb-5">
						<div className="text-start ">
							<h1 className="mt-5">One place.</h1>
							<h1>All your data.</h1>
							<h1>Just for you.</h1>
							<h4 className="pt-4">Get ready to organize. </h4>
							<h4>Get ready to be the best version of you.</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInRight" data-wow-duration="2s">
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671094629/Captura_de_pantalla_2022-12-15_a_las_9.52.28_glskzy.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671094629/Captura_de_pantalla_2022-12-15_a_las_9.52.32_ezjwfx.png"
							}
							alt="Dashboard image"
						/>
					</Col>
					<Col lg={{ span: 5 }}>
						<div className="pt-3 ms-4">
							<h1>🌉</h1>
							<h2>Organize your space</h2>
							<h4 className="pt-4">No chaos, just you and your things.</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5  wow fadeInLeft " data-wow-duration="2s">
					<Col lg={{ span: 5 }}>
						<div className=" pt-3 text-end pe-4 ">
							<h1>🔖</h1>
							<h2>You said Trello? We say slake.</h2>
							<h4 className="pt-4">Plan your future, get one step ahead of the game.</h4>
						</div>
					</Col>
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671094629/Captura_de_pantalla_2022-12-15_a_las_9.52.39_x1mh5g.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671094631/Captura_de_pantalla_2022-12-15_a_las_9.52.43_izjjuv.png"
							}
							alt="Dashboard image"
						/>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInRight " data-wow-duration="2s">
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671114857/Captura_de_pantalla_2022-12-15_a_las_15.33.59_nyf7pg.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671114857/Captura_de_pantalla_2022-12-15_a_las_15.33.54_cn8alo.png"
							}
							alt="Dashboard image"
						/>
					</Col>
					<Col lg={{ span: 5 }}>
						<div className=" pt-3 ps-4">
							<h1>📚</h1>
							<h2>Never lose any notes again</h2>
							<h4 className="pt-4">Why memorize if you can note it down?</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInLeft " data-wow-duration="2s">
					<Col lg={{ span: 5 }}>
						<div className=" pt-3 text-end pe-4">
							<h1>📝</h1>
							<h2>Create beautiful notes</h2>
							<h4 className="pt-4">Colors? Styling? We have it all.</h4>
						</div>
					</Col>
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671094630/Captura_de_pantalla_2022-12-15_a_las_9.56.21_enxtec.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671094630/Captura_de_pantalla_2022-12-15_a_las_9.56.15_f8aavq.png"
							}
							alt="Dashboard image"
						/>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInRight ">
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671097193/Captura_de_pantalla_2022-12-15_a_las_10.39.29_szor6n.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1671097193/Captura_de_pantalla_2022-12-15_a_las_10.39.23_mimxff.png"
							}
							alt="Dashboard image"
						/>
					</Col>
					<Col lg={{ span: 5 }}>
						<div className="ms-4 pt-3">
							<h1>📖 </h1>
							<h2>Share your favourite notes</h2>
							<h4 className="pt-4">Ready to share the greatest guacamole recipe?</h4>
						</div>
					</Col>
				</Row>
				<hr />

				<Row className="text-center pt-5 wow fadeInUp ">
					<img className="home-icon mb-3" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670318446/favicon_rpvk1o.ico" alt="" />
					<h2>Start using slake. today</h2>
					<h4 className="pt-2 pb-5">Get started for free.</h4>
					<Link to="/signup" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
						Try slake. for free
					</Link>
				</Row>
				<hr />
			</Container>
			<Container fluid className={!darkMode ? "footer px-5 py-4" : "footer-dark px-5 py-4"}>
				©️ Developed by <a href="https://github.com/3Ryuusei3">Manuel Atance</a> and <a href="https://github.com/albertonaval">Alberto Naval</a>
			</Container>
		</>
	)
}

export default Homepage
