import { useContext, useRef, useLayoutEffect, useState } from "react"
import AppRoutes from "./routes/AppRoutes"

import { DarkModeContext } from "./context/darkmode.context"
import { Toaster } from "react-hot-toast"
import Navigation from "./components/Navbar/Navbar"
import "./App.css"

const App = () => {
	const { darkMode } = useContext(DarkModeContext)

	const targetRef = useRef()
	const [dimensions, setDimensions] = useState({})

	let movement_timer = null
	const RESET_TIMEOUT = 100

	const test_dimensions = () => {
		if (targetRef.current) {
			setDimensions({
				width: targetRef.current.offsetWidth,
				height: targetRef.current.offsetHeight,
			})
		}
	}

	useLayoutEffect(() => {
		test_dimensions()
	}, [])

	window.addEventListener("resize", () => {
		clearInterval(movement_timer)
		movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT)
	})

	console.log(dimensions)

	return (
		<div className={!darkMode ? "pageContainer" : "pageContainer-dark"}>
			<Toaster />
			<Navigation />
			<div ref={targetRef} style={{ "--windowWidth": dimensions }}>
				<AppRoutes />
			</div>
		</div>
	)
}

export default App
