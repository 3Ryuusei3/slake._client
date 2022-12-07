import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Callout from "../../components/Dashboard/Callout"
import ToDo from "../../components/Dashboard/Todo"
import { useState } from "react"

function Dashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	return (
		<>
			<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
			<Header isSidebarOpen={isSidebarOpen} />
			<Callout isSidebarOpen={isSidebarOpen} />
			<ToDo isSidebarOpen={isSidebarOpen} />
		</>
	)
}

export default Dashboard
