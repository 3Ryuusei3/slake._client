import { Routes, Route } from "react-router-dom"

import Dashboard from "../pages/Dashboard/Dashboard"
import Kanban from "../pages/Kanban/Kanban"
import LoginPage from "../pages/LoginPage/LoginPage"
import Notes from "../pages/Notes/Notes"
import Calendar from "../pages/Calendar/Calendar"
import Pricing from "../pages/Pricing /Pricing"
import HomePage from "./../pages/HomePage/HomePage"
import SingleNote from "./../pages/SingleNote/SingleNote"
import SignupPage from "./../pages/SignupPage/Signup"
import PrivateRoute from "./PrivateRoute"
import SharedNotes from "../pages/SharedNotes/SharedNotes"

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/plan" element={<Pricing />} />

			<Route element={<PrivateRoute />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/kanban" element={<Kanban />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/notes" element={<Notes />} />
				<Route path="/shared_notes" element={<SharedNotes />} />
				<Route path="/note/:id" element={<SingleNote />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
