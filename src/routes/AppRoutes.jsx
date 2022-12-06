import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard"
import LoginPage from "../pages/LoginPage/LoginPage"
import HomePage from "./../pages/HomePage/HomePage"
import SignupPage from "./../pages/SignupPage/Signup"

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	)
}

export default AppRoutes
