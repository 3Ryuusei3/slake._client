import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import singleNoteService from "../../services/singleNote.service"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import TextEditor from "../../components/SingleNote/TextEditor"

function SingleNote() {
	let location = useLocation()
	let noteId = location.pathname.slice(6)

	const [singleNoteData, setSingleNoteData] = useState()

	const getSingleNoteData = () => {
		singleNoteService
			.getNoteByNoteId(noteId)
			.then(res => {
				console.log(res.data)
				setSingleNoteData(res.data)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getSingleNoteData()
	}, [])

	return (
		<>
			<Sidebar />
			<Header />
			{singleNoteData && <TextEditor singleNoteData={singleNoteData} noteId={noteId} />}
		</>
	)
}

export default SingleNote
