import { useContext, useState, useRef, useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"
import singleNoteService from "../../services/singleNote.service"

const HeaderTitle = ({ headerTitle }) => {
	const [title, setTitle] = useState(headerTitle)
	const [offset, setOffset] = useState()
	const titleRef = useRef()

	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	useLayoutEffect(() => {
		if (offset !== undefined && offset > 0) {
			const newRange = document.createRange()
			newRange.setStart(titleRef.current.childNodes[0], offset)

			const selection = document.getSelection()
			selection.removeAllRanges()
			selection.addRange(newRange)
		}
	})

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)

	const handleTitle = e => {
		const range = document.getSelection().getRangeAt(0)
		setOffset(range.startOffset)

		setTitle(e.target.textContent)
		handleTitleUpdate()
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
		} else if (location.pathname.includes("/note/")) {
			let noteId = location.pathname.slice(6)

			singleNoteService
				.getNoteByNoteId(noteId)
				.then(res => {
					return singleNoteService.updateHeader(res.data._id, { title })
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
	}

	return (
		<div className={!isSidebarOpen ? "pt-3 pb-2 leftPaddingSm" : "pt-3 pb-2 leftPaddingLg"}>
			<div className={!darkMode ? "headerInput" : "headerInput-dark"} contentEditable suppressContentEditableWarning spellCheck="false" onInput={handleTitle} onBlur={handleTitleUpdate} ref={titleRef}>
				{title}
			</div>
		</div>
	)
}

export default HeaderTitle
