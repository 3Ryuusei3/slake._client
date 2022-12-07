import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState } from "react"

function Dashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	return (
		<>
			<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
			<Header isSidebarOpen={isSidebarOpen} />
		</>
	)
}

export default Dashboard
