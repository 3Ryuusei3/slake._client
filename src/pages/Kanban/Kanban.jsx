/* import Header from "../../components/Header/Header" */
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import kanbanServices from "../../services/kanban.service"
import KanbanContainer from "../../components/Kanban/KanbanContainer"
import Header from "../../components/Header/Header"
import ContentLoader, { rect } from "react-content-loader"

function Kanban() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [kanbanData, setKanbanData] = useState()
	const { user } = useContext(AuthContext)


	const HeaderSkeleton = () => (
		<ContentLoader viewBox="0 0 400 475" className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
			<rect y="5" rx="5" ry="5" width="345" height="60" />
			<rect x="0" y="70" rx="5" ry="5" width="100" height="13" />
		</ContentLoader>
	)

	const getKanbanData = () => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				setKanbanData(res.data[0])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getKanbanData()
	}, [])

	return (
		<>
			{!kanbanData ? (
				<HeaderSkeleton />
			) : (
				<>
					<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
					<Header isSidebarOpen={isSidebarOpen} />
					<KanbanContainer isSidebarOpen={isSidebarOpen} />
				</>
			)}
		</>
	)
}

export default Kanban
