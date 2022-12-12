import { useLocation } from "react-router-dom"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"

function Kanban() {
	let location = useLocation()
	let pageLocation = location.pathname

	console.log(pageLocation.includes("/note/"))

	return (
		<>
			<Sidebar />
			<Header />
		</>
	)
}

export default Kanban
