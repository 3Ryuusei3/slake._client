import "./App.css"
import AppRoutes from "./routes/AppRoutes"
import Navigation from "./components/Navbar/Navbar"
import CheckoutForm from "./components/CheckoutForm/CheckoutForm"
import { Toaster } from 'react-hot-toast'
import { useContext } from "react"
import { DarkModeContext } from "./context/darkmode.context"

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('')




function App() {

	const { darkMode } = useContext(DarkModeContext)
	const options = {
		clientSecret: 'stripeSecret'
	}


	return (
		<div style={!darkMode ? { color: "var(--text-primary)", backgroundColor: "var(--bg-primary)", minHeight: "100vh" } :
			{ color: "var(--dark-text-primary)", backgroundColor: "var(--dark-bg-primary)", minHeight: "100vh" }}>
			<Toaster />
			<Navigation />
			<AppRoutes />

			{/* <Elements stripe={stripePromise} options={options}>
				<CheckoutForm />
			</Elements> */}
		</div>
	)
}

export default App
