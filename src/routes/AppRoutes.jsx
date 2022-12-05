import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import HomePage from "./../pages/HomePage/HomePage"
import SignupPage from "./../pages/SignupPage/Signup"

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	)
}

export default AppRoutes
