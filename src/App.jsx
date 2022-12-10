import "./App.css"
import AppRoutes from "./routes/AppRoutes"
import Navigation from "./components/Navbar/Navbar"
import { Toaster } from 'react-hot-toast'


function App() {
	return (
		<>
			<Toaster />
			<Navigation />
			<AppRoutes />
		</>
	)
}

export default App
