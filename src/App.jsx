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





// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'

//import CheckoutForm from "./components/CheckoutForm/CheckoutForm"
// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
{/* <Elements stripe={stripePromise} options={options}>
<CheckoutForm />
</Elements> */}
// const [clientSecret, setClientSecret] = useState("");

// useEffect(() => {

	// 	fetch("/api/payment/create-payment-intent", {
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 	})
		// 		.then((res) => res.json())
		// 		.then((data) => setClientSecret(data.clientSecret));
		// }, []);

		// const appearance = {
			// 	theme: 'stripe',
			// };
			// const options = {
				// 	clientSecret,
				// 	appearance,
				// };