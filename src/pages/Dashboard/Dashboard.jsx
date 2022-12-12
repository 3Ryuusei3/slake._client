import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"

import dashboardServices from "../../services/dashboard.service"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Callout from "../../components/Dashboard/Callout"
import ToDo from "../../components/Dashboard/Todo"
import CalloutSkeleton from "../../components/Dashboard/Calloutskeleton"

function Dashboard() {
	const [dashboardData, setDashboardData] = useState()

	const { user } = useContext(AuthContext)

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
				<CalloutSkeleton />
			) : (
				<>
					<CalloutSkeleton />
					<Sidebar />
					<Header />
					<Callout dashboardData={dashboardData} />
					<ToDo dashboardData={dashboardData} />
				</>
			)}
		</>
	)
}

export default Dashboard
