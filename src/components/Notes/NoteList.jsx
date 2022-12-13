import { useState, useContext, useEffect } from "react"
import { Link, UNSAFE_NavigationContext } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"


import singleNoteService from "../../services/singleNote.service"
import { List } from "react-content-loader"

function NotesList() {

	const [notes, setNotes] = useState()
	const [noteId, setNoteId] = useState("")

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	const getNotes = () => {

		singleNoteService
			.getNotesListByUser(user._id)
			.then(res => {
				setNotes(res.data)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getNotes()
	}, [])

	const addNewNote = () => {
		singleNoteService
			.createNewNote({ owner: user._id })
			.then(res => {
				setNotes([...notes, res.data])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}


	const deleteNoteByNoteId = () => {

		singleNoteService
			.deleteNoteByNoteId(notes[noteId]._id, { new: true })
			.then(() => getNotes())
			.catch(err => console.log({ message: 'Internal server error', err }))
	}

	const handleMouseOver = id => {
		setNoteId(id)
	}

	const handleMouseOut = () => {
		setNoteId("")
	}

	return (
		<>
			{!notes ? (
				<div style={{ paddingLeft: "300px" }}>
					<List />
				</div>
			) : (
				<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"} style={{ paddingRight: "70px" }}>
					<div className="d-flex justify-content-between align-items-center">
						<h3 className="pt-2">Your notes</h3>
						<button className="createNewNote" onClick={() => addNewNote()}>
							<i className="bi bi-plus-lg"></i>
						</button>
					</div>
					<div className="noteList pt-2">
						<table>
							<thead>
								<tr className="text-muted text-muted-lg">
									<th>
										<i className="bi bi-type noteHeaderIcon"></i>
										Name
									</th>
									<th>
										<i className="bi bi-bookmark noteHeaderIcon"></i>
										Tag
									</th>
									<th>
										<i className="bi bi-calendar2 noteHeaderIcon"></i>
										Last update
									</th>
									<th>
										<i className="bi bi-star noteHeaderIcon"></i>
										Shared
									</th>
								</tr>
							</thead>
							<tbody className={!darkMode ? 'tbody-color' : 'tbody-color-dark'}>
								{notes.map((elm, idx) => {
									let date = new Date(elm.updatedAt)
									return (
										<tr key={idx} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
											<td className="d-flex justify-content-between">
												<div>
													<span className="me-2">{elm.header.icon}</span>
													<Link to={`/note/${elm._id}`} className={!darkMode ? 'singleNoteLink' : 'singleNoteLink-dark'}>{elm.header.title}</Link>
												</div>
												<button onClick={() => deleteNoteByNoteId()}>
													{noteId === idx ? <i className="bi bi-trash3"></i> : <i className="bi bi-trash3" style={{ color: "transparent" }}></i>}
												</button>
											</td>
											<td>{elm.tag}</td>
											<td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</td>
											<td>{elm.shared ? "Yes" : "No"}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}

export default NotesList
