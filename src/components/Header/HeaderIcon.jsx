import { useContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { SidebarContext } from "../../context/sidebar.context"
import { AuthContext } from "../../context/auth.context"

import InputEmoji from "react-input-emoji"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"
import singleNoteService from "../../services/singleNote.service"
import { DarkModeContext } from "../../context/darkmode.context"

function HeaderIcon({ headerIcon }) {
	const [icon, setIcon] = useState(headerIcon)

	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)
	let isSharedRoute = false
	if (location.pathname.includes("shared")) {
		isSharedRoute = true
	}

	useEffect(() => {
		icon && handleEmojiUpdate()
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
		} else if (location.pathname.includes("/note/")) {
			let noteId = location.pathname.slice(6)

			singleNoteService
				.getNoteByNoteId(noteId)
				.then(res => {
					return singleNoteService.updateHeader(res.data._id, { icon })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
	}

	return (
		<>
			<div style={{ position: "relative", marginRight: "5%" }} className={!isSidebarOpen ? "leftPaddingSm mb-5" : "leftPaddingLg mb-5"}>
				<div className="emojiHeader" style={isSharedRoute ? { pointerEvents: "none" } : {}}>
					<InputEmoji value={icon} onChange={setIcon} placeholder={headerIcon} height={100} theme={!darkMode ? "light" : "dark"} />
				</div>
			</div>
		</>
	)
}

export default HeaderIcon
