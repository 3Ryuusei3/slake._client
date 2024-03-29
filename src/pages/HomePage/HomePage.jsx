import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { DarkModeContext } from "../../context/darkmode.context"
import { AuthContext } from "../../context/auth.context"

import Footer from "../../components/Footer/Footer"
import TrySlake from "../../components/Footer/TrySlake"

import { Container, Row, Col } from "react-bootstrap"
import WOW from "wowjs"

const Homepage = () => {
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
			<Container className="py-5">
				<Row className="mt-5 pb-5 align-items-center justify-content-lg-end wow fadeInUp " data-wow-duration="2s">
					<Col lg={{ span: 7 }} className="text-center">
						<div className="d-flex my-5 pb-5">
							<img src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670317681/undraw_experience_design_re_ca7l_bgrfu1.svg" alt="Team" width="100%" />
						</div>
					</Col>
					<Col lg={{ span: 5 }} className="text-center d-flex justify-content-lg-end justify-content-md-center pb-5 mb-5">
						<div className="text-start ">
							<h1 className="mt-5 homeTitle">All your data. Just for you. One place.</h1>
							<h4 className="pt-5">Get ready to organize.</h4>
							<h4>Get ready to become the best version of you.</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInRight" data-wow-duration="2s">
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1674674476/Dashboard_nanke7.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1674674476/Dashboard-dark_tynjhx.png"
							}
							alt="Dashboard"
						/>
					</Col>
					<Col lg={{ span: 5 }}>
						<div className="pt-3 ms-4">
							<h1 className="pb-3">🌉</h1>
							<h2>Organize your space</h2>
							<h4 className="pt-4">No chaos, just you and your things.</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5  wow fadeInLeft " data-wow-duration="2s">
					<Col lg={{ span: 5 }}>
						<div className=" pt-3 text-end pe-4 ">
							<h1 className="pb-3">🔖</h1>
							<h2>You said Trello? We say slake.</h2>
							<h4 className="pt-4">Plan your future and start getting one step ahead of the game.</h4>
						</div>
					</Col>
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode ? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862192/Kanban_cutzwk.png" : "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862189/Kanban-dark_e8jjc0.png"
							}
							alt="Kanban"
						/>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInRight " data-wow-duration="2s">
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862193/Calendar_nulgod.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862190/Calendar-dark_yskml6.png"
							}
							alt="Calendar"
						/>
					</Col>
					<Col lg={{ span: 5 }}>
						<div className=" pt-3 ps-4">
							<h1 className="pb-3">📆</h1>
							<h2>Take one day at a time</h2>
							<h4 className="pt-4">Did you forget grandma's birthday last year? Not anymore.</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInLeft " data-wow-duration="2s">
					<Col lg={{ span: 5 }}>
						<div className="text-end pt-3 ps-4">
							<h1 className="pb-3">📚</h1>
							<h2>Never lose any notes again</h2>
							<h4 className="pt-4">Why memorize if you can note it down?</h4>
						</div>
					</Col>
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={!darkMode ? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862192/Notes_i1logb.png" : "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862190/Notes-dark_gjg5le.png"}
							alt="Notes"
						/>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInRight" data-wow-duration="2s">
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673865897/Singlenote_yukgql.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673865897/Singlenote-dark_w9etkz.png"
							}
							alt="Note"
						/>
					</Col>
					<Col lg={{ span: 5 }}>
						<div className="pt-3 pe-4">
							<h1 className="pb-3">📝</h1>
							<h2>Create beautiful notes</h2>
							<h4 className="pt-4">Colors? Styling? Photos? We have it all.</h4>
						</div>
					</Col>
				</Row>

				<Row className="align-items-center my-5 py-5 wow fadeInLeft ">
					<Col lg={{ span: 5 }}>
						<div className="text-end ms-4 pt-3">
							<h1 className="pb-3">📖 </h1>
							<h2>Share your favourite notes</h2>
							<h4 className="pt-4">Ready to share the greatest guacamole recipe?</h4>
						</div>
					</Col>
					<Col lg={{ span: 7 }}>
						<img
							className="featureImg"
							src={
								!darkMode
									? "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862196/Sharednote_nza4hw.png"
									: "https://res.cloudinary.com/dhws4e2ty/image/upload/v1673862196/Sharednote-dark_wxpnfv.png"
							}
							alt="Shared notes"
						/>
					</Col>
				</Row>
			</Container>
			<TrySlake />
			<Footer />
		</>
	)
}

export default Homepage
