import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"

function HeaderTitle({ headerTitle, setHeaderData }) {
	const [title, setTitle] = useState(headerTitle)
	const { user } = useContext(AuthContext)

	const { isSidebarOpen } = useContext(SidebarContext)

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)

	const handleTitle = e => {
		handleTitleUpdate()
		setTitle(e.target.value)
	}

	const handleTitleUpdate = () => {

		if (pageLocation === "dashboard") {
			dashboardServices
				.getDashboardByUser(user._id)
				.then(res => {
					return dashboardServices.updateHeader(res.data[0]._id, { title })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "kanban") {
			kanbanServices
				.getKanbanByUser(user._id)
				.then(res => {
					return kanbanServices.updateHeader(res.data[0]._id, { title })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "notes") {
			notesServices
				.getNotesByUser(user._id)
				.then(res => {
					return notesServices.updateHeader(res.data[0]._id, { title })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
			<input className="headerTitle headerInput" placeholder="Untitled" value={title} onChange={handleTitle} onBlur={handleTitleUpdate} />
		</div>
	)
}

export default HeaderTitle
