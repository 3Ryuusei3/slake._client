/* import Header from "../../components/Header/Header" */
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import notesServices from "../../services/notes.service"

import Header from "../../components/Header/Header"
import NotesList from "../../components/Notes/NoteList"
import Sidebar from "../../components/Sidebar/Sidebar"

function Notes() {
	const [notesData, setNotesData] = useState()

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

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
					<Sidebar />
					<Header />
					<NotesList />
				</>
			)}
		</>
	)
}

export default Notes
