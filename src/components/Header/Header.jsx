import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"

import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"

function Header() {
	const [headerData, setHeaderData] = useState()

	const { user } = useContext(AuthContext)

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

	return (
		<>
			{!headerData ? (
				<h1>Cargando</h1>
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
