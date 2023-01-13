import { useState, useContext, useEffect } from "react"

import { AuthContext } from "../../context/auth.context"
import { PomodoroContext } from "../../context/pomodoro.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Callout from "../../components/Dashboard/Callout"
import ToDo from "../../components/Dashboard/Todo"
import Quote from "../../components/Dashboard/Quote"
import Timer from "../../components/Pomodoro/Timer"
import Settings from "../../components/Pomodoro/Settings"
import { DarkModeContext } from "../../context/darkmode.context"



const Dashboard = () => {

	const [dashboardData, setDashboardData] = useState()

	const { showSettings } = useContext(PomodoroContext)
	const { isSidebarOpen } = useContext(SidebarContext)
	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)

	const getDashboardData = () => {
		dashboardServices
			.getDashboardByUser(user._id)
			.then(res => {
				setDashboardData(res.data[0])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getDashboardData()
	}, [])

	return (
		<>
			{!dashboardData ? (
				<div className={
					!isSidebarOpen ? "leftPaddingSm DashboardSkeleton" : "leftPaddingLg DashboardSkeleton"} style={!darkMode ? { "--skeletonColor": "var(--bg-interact)" } : { "--skeletonColor": "var(--dark-bg-interact)" }}></div>
			) : (
				<div>
					<Sidebar />
					<Header />
					<Callout dashboardData={dashboardData} />

					<div className={!isSidebarOpen ? "leftPaddingSm rightMargin pb-5 grid-container" : "leftPaddingLg rightMargin pb-5 grid-container"}>
						<div>
							<Quote />
							<ToDo dashboardData={dashboardData} />
						</div>
						<div>
							<h3 className="pt-4">Pomodoro</h3>
							{showSettings ? <Settings /> : <Timer />}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Dashboard
