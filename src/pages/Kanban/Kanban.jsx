/* import Header from "../../components/Header/Header" */
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import kanbanServices from "../../services/kanban.service"
import KanbanContainer from "../../components/Kanban/KanbanContainer"
import Header from "../../components/Header/Header"

function Kanban() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [kanbanData, setKanbanData] = useState()
	const { user } = useContext(AuthContext)

	const getKanbanData = () => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				setKanbanData(res.data[0])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getKanbanData()
	}, [])

	return (
		<>
			{!kanbanData ? (
				<h1>Cargando</h1>
			) : (
				<>
					<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
					<Header isSidebarOpen={isSidebarOpen} />
					<KanbanContainer isSidebarOpen={isSidebarOpen} />
				</>
			)}
		</>
	)
}

export default Kanban
