import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import kanbanServices from "../../services/kanban.service"

import Board from "react-trello"
import { Instagram } from "react-content-loader"


const KanbanContainer = () => {
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
				<div className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
					<Instagram />
				</div>
			) : (

				<section className={!isSidebarOpen ? "mt-4 rightMargin leftPaddingSm" : "mt-4 rightMargin leftPaddingLg"}>
					<Board
						onDataChange={data => {
							handleKanbanUpdate(data)
						}}
						editable
						draggable
						editLaneTitle
						data={lanes}
					/>
				</section>
			)}
		</>
	)
}



export default KanbanContainer
