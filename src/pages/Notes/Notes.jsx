/* import Header from "../../components/Header/Header" */
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import notesServices from "../../services/notes.service"

function Notes() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [notesData, setNotesData] = useState()
	const { user } = useContext(AuthContext)

	const getNotesData = () => {
		notesServices
			.getNotesByUser(user._id)
			.then(res => {
				setNotesData(res.data[0])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getNotesData()
	}, [])

	return (
		<>
			{!notesData ? (
				<h1>Cargando</h1>
			) : (
				<>
					<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
				</>
			)}
		</>
	)
}

export default Notes
