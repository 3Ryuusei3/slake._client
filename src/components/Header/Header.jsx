import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import calendarServices from "../../services/calendar.service"
import notesServices from "../../services/notes.service"
import singleNoteService from "../../services/singleNote.service"

import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"

const Header = () => {
	const [headerData, setHeaderData] = useState()

	const { darkMode } = useContext(DarkModeContext)
	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)

	const getHeaderData = () => {
		if (pageLocation === "dashboard") {
			dashboardServices
				.getDashboardByUser(user._id)
				.then(res => {
					setHeaderData(res.data[0])
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "kanban") {
			kanbanServices
				.getKanbanByUser(user._id)
				.then(res => {
					setHeaderData(res.data[0])
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "calendar") {
			calendarServices
				.getCalendarByUser(user._id)
				.then(res => {
					setHeaderData(res.data[0])
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "notes") {
			notesServices
				.getNotesByUser(user._id)
				.then(res => {
					setHeaderData(res.data[0])
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "shared_notes") {
			setHeaderData({
				header: {
					image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
					title: "Shared notes",
					icon: "📚",
				},
			})
		} else if (location.pathname.includes("/note/")) {
			let noteId = location.pathname.slice(6)

			singleNoteService
				.getNoteByNoteId(noteId)
				.then(res => {
					setHeaderData(res.data)
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
	}

	useEffect(() => {
		getHeaderData()
	}, [])

	return (
		<>
			{!headerData ? (
				<div
					className={!isSidebarOpen ? "leftPaddingSm HeaderSkeleton" : "leftPaddingLg HeaderSkeleton"}
					style={!darkMode ? { "--skeletonColor": "var(--bg-interact)" } : { "--skeletonColor": "var(--dark-bg-interact)" }}
				></div>
			) : (
				<>
					<header style={{ postion: "relative" }}>
						<HeaderImage headerImg={headerData.header.image} headerData={headerData} setHeaderData={setHeaderData} />
						<HeaderIcon headerIcon={headerData.header.icon} />
						<HeaderTitle headerTitle={headerData.header.title} setHeaderData={setHeaderData} />
					</header>
				</>
			)}
		</>
	)
}

export default Header
