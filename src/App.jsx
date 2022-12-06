import "./App.css"
import AppRoutes from "./routes/AppRoutes"
import Navigation from "./components/Navbar/Navbar"
import { useContext } from "react"
import { AuthContext } from "./context/auth.context"

function App() {
	const { user } = useContext(AuthContext)

	return (
		<>
			{!user && <Navigation />}
			<AppRoutes />
		</>
	)
}

export default App
