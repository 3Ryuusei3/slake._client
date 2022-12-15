import { useContext } from "react"
import AppRoutes from "./routes/AppRoutes"

import { DarkModeContext } from "./context/darkmode.context"
import { Toaster } from "react-hot-toast"
import Navigation from "./components/Navbar/Navbar"
import "./App.css"

function App() {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div className={!darkMode ? "pageContainer" : "pageContainer-dark"}>
			<Toaster />
			<Navigation />
			<AppRoutes />
		</div>
	)
}

export default App
