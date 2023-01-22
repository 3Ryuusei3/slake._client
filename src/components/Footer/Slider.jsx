import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import { Container, Row } from "react-bootstrap"

const Slider = () => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<Container fluid>
			<Row className="mt-5">
				<Row className={!darkMode ? "my-4 carousel" : "my-4 carousel-dark"}>
					<div
						className="sliderTrack"
						style={!darkMode ? { "--slideText": "var(--text-primary)", "--slideBg": "var(--bg-primary)" } : { "--slideText": "var(--dark-text-primary)", "--slideBg": "var(--dark-bg-primary)" }}
					>
						<div className="slide slide-regular">slake.</div>
						<div className="slide slide-purple-outline">slake.</div>
						<div className="slide slide-outline">slake.</div>
						<div className="slide slide-purple">slake.</div>

						<div className="slide slide-purple-outline">slake.</div>
						<div className="slide slide-regular">slake.</div>
						<div className="slide slide-outline">slake.</div>
						<div className="slide slide-purple">slake.</div>

						<div className="slide slide-regular">slake.</div>
						<div className="slide slide-purple-outline">slake.</div>
						<div className="slide slide-outline">slake.</div>
						<div className="slide slide-purple">slake.</div>

						<div className="slide slide-outline">slake.</div>
						<div className="slide slide-purple">slake.</div>
						<div className="slide slide-regular">slake.</div>
						<div className="slide slide-purple-outline">slake.</div>

						<div className="slide slide-regular">slake.</div>
						<div className="slide slide-purple">slake.</div>
						<div className="slide slide-outline">slake.</div>
						<div className="slide slide-purple-outline">slake.</div>
					</div>
				</Row>
			</Row>
		</Container>
	)
}

export default Slider
