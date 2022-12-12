import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import kanbanServices from "../../services/kanban.service"

import Board from "react-trello"

function KanbanContainer() {
	const [lanes, setLanes] = useState()

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	const getKanbanData = () => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				setLanes({ lanes: res.data[0].lanes })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getKanbanData()
	}, [])

	const handleKanbanUpdate = data => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				return kanbanServices.updateKanban(res.data[0]._id, { lanes: data })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	return (
		<>
			{!lanes ? (
				<h1>Cargando</h1>
			) : (
				<div
					className="me-6 mt-4"
					style={!isSidebarOpen ? { marginLeft: "150px", transition: "0.3s ease", position: "relative" } : { marginLeft: "300px", transition: "0.4s ease", position: "relative" }}
				>
					<Board
						onDataChange={data => {
							handleKanbanUpdate(data)
						}}
						editable
						draggable
						editLaneTitle
						data={lanes}
					/>
				</div>
			)}
		</>
	)
}

export default KanbanContainer
