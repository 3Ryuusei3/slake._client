import { Routes, Route } from "react-router-dom"

import Dashboard from "../pages/Dashboard/Dashboard"
import Kanban from "../pages/Kanban/Kanban"
import LoginPage from "../pages/LoginPage/LoginPage"
import Notes from "../pages/Notes/Notes"
import HomePage from "./../pages/HomePage/HomePage"
import SignupPage from "./../pages/SignupPage/Signup"
import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />

			<Route element={<PrivateRoute />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/kanban" element={<Kanban />} />
				<Route path="/notes" element={<Notes />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
