import { useContext, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import Board from "react-trello"
import { AuthContext } from "../../context/auth.context"
import kanbanServices from "../../services/kanban.service"

function KanbanContainer({ isSidebarOpen }) {

	const { user } = useContext(AuthContext)
	const [lanes, setLanes] = useState()

	const getKanbanData = () => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				setLanes({ "lanes": res.data[0].lanes })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}


	useEffect(() => {
		getKanbanData()
	}, [])

	const handleKanbanUpdate = (data) => {
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
				<div className="me-6 mt-4" style={!isSidebarOpen ? { marginLeft: "150px", transition: "0.3s ease", position: "relative" } : { marginLeft: "300px", transition: "0.4s ease", position: "relative" }}>
					<Board onDataChange={(data) => { handleKanbanUpdate(data) }} editable draggable editLaneTitle data={lanes} laneDraggable={false} />
				</div>
			)}
		</>
	)
}

export default KanbanContainer