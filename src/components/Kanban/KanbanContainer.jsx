import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"

import kanbanServices from "../../services/kanban.service"

import Board from "react-trello"


const KanbanContainer = () => {
	const [lanes, setLanes] = useState()

	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)
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
				<div className={!isSidebarOpen ? "mt-4 rightMargin leftPaddingSm KanbanSkeleton" : "mt-4 rightMargin leftPaddingLg KanbanSkeleton"}
					style={!darkMode ? { "--skeletonColor": "var(--bg-interact)" } : { "--skeletonColor": "var(--dark-bg-interact)" }}>
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
						style={{
							"--textColor": !darkMode ? "var(--text-primary)" : "var(--dark-text-primary)",
							"--headerColor": !darkMode ? "var(--color-primary)" : "var(--dark-color-primary)",
							"--laneColor": !darkMode ? "var(--color-primary-btn)" : "var(--dark-bg-navbar)",
							"--cardColor": !darkMode ? "var(--bg-primary)" : "var(--dark-bg-card)",
							"--cardBtnColor": !darkMode ? "var(--bg-secondary)" : "var(--dark-bg-navbar)",
							"--cardHoverBtnColor": !darkMode ? "var(--bg-navbar)" : "var(--dark-bg-interact)",
							"--closeBtnColor": !darkMode ? "0" : "1",
						}}
					/>
				</section>
			)}
		</>
	)
}

export default KanbanContainer
