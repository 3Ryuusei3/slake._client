import { useContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { SidebarContext } from "../../context/sidebar.context"
import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import calendarServices from "../../services/calendar.service"
import notesServices from "../../services/notes.service"
import singleNoteService from "../../services/singleNote.service"

import Picker from "emoji-picker-react"

const HeaderIcon = ({ headerIcon }) => {
	const [icon, setIcon] = useState(headerIcon)
	const [picker, setPicker] = useState(false)

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
		} else if (pageLocation === "calendar") {
			calendarServices
				.getCalendarByUser(user._id)
				.then(res => {
					return calendarServices.updateHeader(res.data[0]._id, { icon })
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

	// Check if mouse is outside of emoji picker
	useEffect(() => {
		document.addEventListener("click", handleDocumentClick, false)
	}, [picker])

	const handleDocumentClick = e => {
		let isEmojiClassFound = false

		e &&
			e.path &&
			e.path.forEach(elm => {
				if (elm && elm.classList) {
					const data = elm.classList.value
					if (data.includes("emoji")) {
						isEmojiClassFound = true
					}
				}
			})
		if (isEmojiClassFound === false && e.target.id !== "emojis-btn") setPicker(false)
	}

	const onEmojiClick = emojiObject => {
		setIcon(emojiObject.emoji)
		setPicker(false)
	}

	return (
		<div style={{ position: "relative", marginRight: "5%" }} className={!isSidebarOpen ? "leftPaddingSm mb-5" : "leftPaddingLg mb-5"}>
			<div className="emojiHeader" style={isSharedRoute ? { pointerEvents: "none" } : {}} onMouseOver={() => setPicker(true)}>
				<p
					className="emojiField"
					onClick={() => {
						setPicker(true)
					}}
				>
					{icon}
				</p>
				{picker && (
					<div onMouseOut={() => setPicker(false)}>
						<Picker
							height={350}
							width={300}
							theme={!darkMode ? "light" : "dark"}
							lazyLoadEmojis={true}
							onEmojiClick={onEmojiClick}
							disableAutoFocus={true}
							previewConfig={{ showPreview: false }}
							searchPlaceholder={"Search your icon"}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default HeaderIcon
