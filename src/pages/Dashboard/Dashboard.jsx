import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"

import dashboardServices from "../../services/dashboard.service"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Callout from "../../components/Dashboard/Callout"
import ToDo from "../../components/Dashboard/Todo"
import Quote from "../../components/Dashboard/Quote"
import Weather from "../../components/Weather/Weather"

import { Code } from "react-content-loader"

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
				<div style={{ paddingLeft: "300px" }}>
					<Code />
				</div>
			) : (
				<>
					<Sidebar />
					<Header />
					<Callout dashboardData={dashboardData} />
					<Quote />
					<ToDo dashboardData={dashboardData} />
					<Weather />
				</>
			)}
		</>
	)
}

export default Dashboard
