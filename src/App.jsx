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