import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import { Container } from "react-bootstrap"

const Footer = () => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<Container fluid className={!darkMode ? "footer px-5 py-4" : "footer-dark px-5 py-4"}>
			©️ Developed by <a href="https://github.com/3Ryuusei3">Manuel Atance</a> and <a href="https://github.com/albertonaval">Alberto Naval</a>
		</Container>
	)
}

export default Footer
