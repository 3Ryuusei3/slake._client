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

	// holds the timer for setTimeout and clearInterval
	let movement_timer = null

	// the number of ms the window size must stay the same size before the
	// dimension state variable is reset
	const RESET_TIMEOUT = 100

	const test_dimensions = () => {
		// For some reason targetRef.current.getBoundingClientRect was not available
		// I found this worked for me, but unfortunately I can't find the
		// documentation to explain this experience
		if (targetRef.current) {
			setDimensions({
				width: targetRef.current.offsetWidth,
				height: targetRef.current.offsetHeight,
			})
		}
	}

	// This sets the dimensions on the first render
	useLayoutEffect(() => {
		test_dimensions()
	}, [])

	// every time the window is resized, the timer is cleared and set again
	// the net effect is the component will only reset after the window size
	// is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
	// redrawing of the component for more complex components such as charts
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
