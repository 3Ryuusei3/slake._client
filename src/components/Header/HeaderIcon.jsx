import { useContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { SidebarContext } from "../../context/sidebar.context"
import { AuthContext } from "../../context/auth.context"

import InputEmoji from "react-input-emoji"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"

function HeaderIcon({ headerIcon }) {
	const [icon, setIcon] = useState()

	const { user } = useContext(AuthContext)

	const { isSidebarOpen } = useContext(SidebarContext)

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)

	useEffect(() => {
		handleEmojiUpdate()
	}, [icon])

	const handleEmojiUpdate = () => {
		if (pageLocation === "dashboard") {
			dashboardServices
				.getDashboardByUser(user._id)
				.then(res => {
					return dashboardServices.updateHeader(res.data[0]._id, { icon })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "kanban") {
			kanbanServices
				.getKanbanByUser(user._id)
				.then(res => {
					return kanbanServices.updateHeader(res.data[0]._id, { icon })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "notes") {
			notesServices
				.getNotesByUser(user._id)
				.then(res => {
					return notesServices.updateHeader(res.data[0]._id, { icon })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
	}

	return (
		<>
			<div style={{ position: "relative", marginRight: "5%" }} className={!isSidebarOpen ? "leftPaddingSm mb-5" : "leftPaddingLg mb-5"}>
				<div className="emojiHeader">
					<InputEmoji value={icon} onChange={setIcon} placeholder={headerIcon} height={100} theme="light" />
				</div>
			</div>
		</>
	)
}

export default HeaderIcon
