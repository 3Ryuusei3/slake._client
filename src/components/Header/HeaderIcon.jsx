import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"

import { SidebarContext } from "../../context/sidebar.context"
import { AuthContext } from "../../context/auth.context"

import InputEmoji from "react-input-emoji"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"

/* import EmojiPicker, { EmojiStyle, Emoji } from "emoji-picker-react" */

function HeaderIcon({ headerIcon }) {
	const [icon, setIcon] = useState()
	/* const [showPicker, setShowPicker] = useState(false) */

	const { user } = useContext(AuthContext)

	const { isSidebarOpen } = useContext(SidebarContext)

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)

	/* function onClick(emojiData) {
		setSelectedEmoji(emojiData.unified)
		setShowPicker(false)
	} */

	const handleEmojiUpdate = e => {
		e.preventDefault()

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

	/* const emojiSaveBtn = document.getElementsByClassName("react-input-emoji--button");
	emojiSaveBtn[0].addEventListener('blur', (e) => {
		handleEmojiUpdate(e)
	}); */
	/* console.log("DOM: ", emojiSaveBtn[0]) */

	return (
		<>
			<div style={{ position: "relative", marginRight: "5%" }} className={!isSidebarOpen ? "leftPaddingSm mb-5" : "leftPaddingLg mb-5"}>
				<div className="emojiHeader">
					<InputEmoji value={icon} onChange={setIcon} placeholder={headerIcon} height={100} theme="light" />
					<button className="saveIconBtn" onClick={handleEmojiUpdate}></button>
				</div>
			</div>
		</>
	)
}

export default HeaderIcon
