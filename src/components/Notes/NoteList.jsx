import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"

import singleNoteService from "../../services/singleNote.service"
import { List } from "react-content-loader"

function NotesList() {
	const [notes, setNotes] = useState()
	const [notesCopy, setNotesCopy] = useState()
	const [noteId, setNoteId] = useState("")

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	const getNotes = () => {
		singleNoteService
			.getNotesListByUser(user._id)
			.then(res => {
				setNotesCopy(res.data)
				setNotes(res.data)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getNotes()
	}, [])

	const handleSearchInput = e => {
		if (e.target.value === "") {
			setNotes(notesCopy)
		} else {
			const filteredNotes = notesCopy.filter(elm => elm.header.title.toLowerCase().includes(e.target.value.toLowerCase()))
			setNotes(filteredNotes)
		}
	}

	const addNewNote = () => {
		singleNoteService
			.createNewNote({ owner: user._id })
			.then(res => {
				setNotes([...notes, res.data])
				setNotesCopy([...notesCopy, res.data])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const deleteNoteByNoteId = () => {
		singleNoteService
			.deleteNoteByNoteId(notes[noteId]._id, { new: true })
			.then(() => getNotes())
			.catch(err => console.log({ message: "Internal server error", err }))
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
				<div className={!isSidebarOpen ? "leftPaddingSm rightMargin my-3 mb-5 notesContainer" : "leftPaddingLg rightMargin my-3 mb-5 notesContainer"}>
					<div className="d-flex justify-content-between align-items-center">
						<h3 className="pt-2">Your notes</h3>
						<div>
							<input onChange={handleSearchInput} className={!darkMode ? "note-search" : "note-search-dark"} type="text" placeholder="Search a note" />
							<button className="createNewNote" onClick={() => addNewNote()}>
								<i className="bi bi-plus-lg"></i>
							</button>
						</div>
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
							<tbody className={!darkMode ? "tbody-color" : "tbody-color-dark"}>
								{notes.map((elm, idx) => {
									let date = new Date(elm.updatedAt)
									return (
										<tr key={idx} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
											<td className="d-flex justify-content-between">
												<div>
													<span className="me-2">{elm.header.icon}</span>
													<Link to={`/note/${elm._id}`} className={!darkMode ? "singleNoteLink" : "singleNoteLink-dark"}>
														{elm.header.title}
													</Link>
												</div>
												<button className={!darkMode ? "deleteNoteBtn" : "deleteNoteBtn-dark"} onClick={() => deleteNoteByNoteId()}>
													{noteId === idx ? <i className="bi bi-trash3"></i> : <i className="bi bi-trash3" style={{ color: "transparent" }}></i>}
												</button>
											</td>
											<td>
												<span className={!darkMode ? `noteCategory ${elm.tag}Category mb-0` : `noteCategory ${elm.tag}CategoryDark mb-0`}>{elm.tag}</span>
											</td>
											<td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</td>
											<td>{elm.shared ? "✅" : "❌"}</td>
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
