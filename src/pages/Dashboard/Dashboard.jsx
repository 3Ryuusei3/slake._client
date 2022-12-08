import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Callout from "../../components/Dashboard/Callout"
import ToDo from "../../components/Dashboard/Todo"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import dashboardServices from "../../services/dashboard.service"


function Dashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [dashboardData, setDashboardData] = useState()
	const { user } = useContext(AuthContext)

	const getDashboardData = () => {
		console.log(user)
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
			{
				!dashboardData ? <h1>Cargando</h1> :
					<>
						<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
						<Header dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} getDashboardData={getDashboardData} />
						<Callout dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
						<ToDo dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
					</>
			}
		</>
	)
}

export default Dashboard
