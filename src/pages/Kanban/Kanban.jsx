import { useState } from "react"

import KanbanContainer from "../../components/Kanban/KanbanContainer"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"

function Kanban() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	return (
		<>
			<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
			<Header isSidebarOpen={isSidebarOpen} />
			<KanbanContainer isSidebarOpen={isSidebarOpen} />
		</>
	)
}

export default Kanban
