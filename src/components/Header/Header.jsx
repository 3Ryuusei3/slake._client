import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"

import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"
import ContentLoader from "react-content-loader"

function Header() {
	const [headerData, setHeaderData] = useState()

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	const HeaderSkeleton = () => (
		<ContentLoader viewBox="0 0 400 475" className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
			<rect y="5" rx="5" ry="5" width="345" height="60" />
			<rect x="0" y="70" rx="5" ry="5" width="100" height="13" />
		</ContentLoader>
	)

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
		} else if (pageLocation === "notes") {
			notesServices
				.getNotesByUser(user._id)
				.then(res => {
					setHeaderData(res.data[0])
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
	}

	useEffect(() => {
		getHeaderData()
	}, [])

	console.log(headerData)

	return (
		<>
			{!headerData ? (
				<HeaderSkeleton />
			) : (
				<>
					<div style={{ postion: "relative" }}>
						<HeaderImage headerImg={headerData.header.image} headerData={headerData} setHeaderData={setHeaderData} />
						<HeaderIcon headerIcon={headerData.header.icon} />
						<HeaderTitle headerTitle={headerData.header.title} setHeaderData={setHeaderData} />
					</div>
				</>
			)}
		</>
	)
}

export default Header
