import "./App.css"
import AppRoutes from "./routes/AppRoutes"
import Navigation from "./components/Navbar/Navbar"
import { Toaster } from 'react-hot-toast'
import { useContext } from "react"
import { DarkModeContext } from "./context/darkmode.context"




function App() {

	const { darkMode } = useContext(DarkModeContext)

	return (
		<div style={!darkMode ? { color: "var(--text-primary)", backgroundColor: "var(--bg-primary)", minHeight: "100vh" } :
			{ color: "var(--dark-text-primary)", backgroundColor: "var(--dark-bg-primary)", minHeight: "100vh" }}>
			<Toaster />
			<Navigation />
			<AppRoutes />
		</div>
	)
}

export default App
