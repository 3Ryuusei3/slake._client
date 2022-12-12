import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import singleNoteService from "../../services/singleNote.service"
import { List } from "react-content-loader"

function NotesList() {
	const [notes, setNotes] = useState()
	const [input, setInput] = useState("")
	const [noteId, setNoteId] = useState("")


	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	const getNotes = () => {
		singleNoteService
			.getNotesListByUser(user._id)
			.then(res => {
				console.log(res.data)
				setNotes(res.data)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getNotes()
	}, [])

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
						<button className="createNewNote">
							<i className="bi bi-plus-lg"></i>
						</button>
					</div>
					<div className="noteList pt-3">
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
							<tbody>
								<tr>
									<td>My first ever note</td>
									<td>Diary</td>
									<td>11/12/2022</td>
									<td>No</td>
								</tr>
								{notes.map(elm => {
									return (
										<tr>
											<td>{elm.header.title}</td>
											<td>{elm.tag}</td>
											<td>{elm.createdAt}</td>
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

/*

{todo.map((elm, idx) => {
						return (
							<li key={idx} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
								<div style={{ width: "100%" }} className={isItemChecked(idx) === true ? "crossedItem" : ""}>
									<input type="checkbox" onChange={e => handleToDoItemCheck(idx, e)} onBlur={handleTodoUpdate} checked={elm.isDone ? true : false} />
									<input type="text" name={`todoItem${idx}`} value={elm.text} onChange={e => handleToDoItemText(idx, e)} onBlur={handleTodoUpdate} />
								</div>
								{toDoId === idx && (
									<button className="deleteTodo" onClick={() => deleteTodo(idx)}>
										<i className="bi bi-x-lg"></i>
									</button>
								)}
							</li>
						)
					})}

*/
