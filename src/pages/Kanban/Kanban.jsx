import KanbanContainer from "../../components/Kanban/KanbanContainer"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"

const Kanban = () => {
	return (
		<>
			<Sidebar />
			<Header />
			<KanbanContainer />
		</>
	)
}

export default Kanban
