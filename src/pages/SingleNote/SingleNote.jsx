import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import singleNoteService from "../../services/singleNote.service"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import TextEditor from "../../components/SingleNote/TextEditor"

const SingleNote = () => {
	let location = useLocation()
	let noteId = location.pathname.slice(6)

	const [singleNoteData, setSingleNoteData] = useState()

	const { user } = useContext(AuthContext)

	const getSingleNoteData = () => {
		singleNoteService
			.getNoteByNoteId(noteId)
			.then(res => {
				setSingleNoteData(res.data)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getSingleNoteData()
	}, [])

	return (
		<>
			{singleNoteData && (
				<div>
					<Sidebar />
					<div style={user._id !== singleNoteData.owner ? { pointerEvents: "none" } : {}}>
						<Header />
					</div>
					{singleNoteData && <TextEditor singleNoteData={singleNoteData} noteId={noteId} />}
				</div>
			)}
		</>
	)
}

export default SingleNote
