import { useState, useContext } from "react"
import { SidebarContext } from "../../context/sidebar.context"

import KanbanContainer from "../../components/Kanban/KanbanContainer"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"

function Kanban() {
	const { isSidebarOpen } = useContext(SidebarContext)

	return (
		<>
			<Sidebar />
			<Header />
			<KanbanContainer />
		</>
	)
}

export default Kanban
