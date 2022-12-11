import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Callout from "../../components/Dashboard/Callout"
import ToDo from "../../components/Dashboard/Todo"

function Dashboard() {
	const [dashboardData, setDashboardData] = useState()

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

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
				<h1>Cargando</h1>
			) : (
				<>
					<Sidebar getDashboardData={getDashboardData} />
					<Header />
					<Callout dashboardData={dashboardData} />
					<ToDo dashboardData={dashboardData} />
				</>
			)}
		</>
	)
}

export default Dashboard
