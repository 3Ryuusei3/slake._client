import Header from "../../components/Header/Header"

import NotesList from "../../components/Notes/NoteList"
import Sidebar from "../../components/Sidebar/Sidebar"

function Notes() {
	return (
		<>
			<Sidebar />
			<Header />
			<NotesList />
		</>
	)
}

export default Notes
