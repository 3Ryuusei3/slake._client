import { useEffect } from "react"

import { Link } from "react-router-dom"
import { Container, Row } from "react-bootstrap"
import WOW from "wowjs"

const TrySlake = () => {
	useEffect(() => {
		new WOW.WOW({
			live: false,
		}).init()
	}, [])
	return (
		<div className="py-5">
			<Container>
				<hr />
				<Row className="text-center pt-5 wow fadeInUp ">
					<img className="home-icon mb-3" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1674388189/slakelogo_pczzsv.svg" alt="slake. icon" />
					<h2>Start using slake. today</h2>
					<h4 className="pt-2 pb-5">Get started for free.</h4>
					<Link to="/signup" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
						Try slake. for free
					</Link>
				</Row>
				<hr />
			</Container>
		</div>
	)
}

export default TrySlake
