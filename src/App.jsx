import { useContext } from "react"
import AppRoutes from "./routes/AppRoutes"

import { DarkModeContext } from "./context/darkmode.context"
import { Toaster } from "react-hot-toast"
import Navigation from "./components/Navbar/Navbar"
import "./App.css"
/* import { loadStripe } from "@stripe/stripe-js" */
/* import { Elements } from "@stripe/react-stripe-js" */
/* import CheckoutForm from "./components/CheckoutForm/CheckoutForm" */
/* const stripePromise = loadStripe("") */

function App() {
	const { darkMode } = useContext(DarkModeContext)
	const options = {
		clientSecret: "stripeSecret",
	}

	return (
		<div className={!darkMode ? "pageContainer" : "pageContainer-dark"}>
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
