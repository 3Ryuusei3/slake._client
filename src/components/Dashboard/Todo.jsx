import { useState, useContext } from "react"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import dashboardServices from "../../services/dashboard.service"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const ToDo = ({ dashboardData }) => {
	const [todo, setTodo] = useState([...dashboardData.todo])
	const [input, setInput] = useState("")
	const [toDoId, setToDoId] = useState("")

	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)

	const handleTodoUpdate = newTodo => {
		dashboardServices
			.getDashboardByUser(user._id)
			.then(res => {
				return dashboardServices.updateTodo(res.data[0]._id, [...newTodo])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const addToDoItem = item => {
		const newToDo = {
			text: item,
			isDone: false,
		}

		setTodo([...todo, newToDo])
		handleTodoUpdate([...todo, newToDo])
		setInput("")
	}

	const handleEnterInput = (e, item) => {
		if (e.key === "Enter") {
			addToDoItem(item)
		}
	}

	const addToDoItemAtIdx = (item, idx) => {
		const newToDo = {
			text: item,
			isDone: false,
		}

		let toDoListCopy = [...todo]
		toDoListCopy.splice(idx + 1, 0, newToDo)
		finalHandleActions(toDoListCopy)
	}

	const deleteTodo = idx => {
		let toDoListCopy = [...todo]
		toDoListCopy.splice(idx, 1)
		finalHandleActions(toDoListCopy)
	}

	const manageBlockByKey = (e, elm, idx) => {
		if (e.key === "Enter") {
			addToDoItemAtIdx("", idx)
		}

		if (e.key === "Backspace" && elm.text === "") {
			e.preventDefault()
			deleteTodo(idx)
		}
	}

	const handleMouseOver = id => {
		setToDoId(id)
	}

	const handleMouseOut = () => {
		setToDoId("")
	}

	const handleToDoItemText = (i, e) => {
		let toDoListCopy = [...todo]
		toDoListCopy[i].text = e.target.value
		finalHandleActions(toDoListCopy)
	}

	const handleToDoItemCheck = i => {
		let toDoListCopy = [...todo]
		toDoListCopy[i].isDone = !toDoListCopy[i].isDone
		finalHandleActions(toDoListCopy)
	}

	const isItemChecked = i => {
		return todo[i].isDone ? true : false
	}

	const handleOnDragEnd = result => {
		if (!result.destination) return

		let toDoListCopy = [...todo]
		const [reorderedItem] = toDoListCopy.splice(result.source.index, 1)
		toDoListCopy.splice(result.destination.index, 0, reorderedItem)
		finalHandleActions(toDoListCopy)
	}

	const finalHandleActions = list => {
		setTodo(list)
		handleTodoUpdate(list)
	}

	return (
		<>
			{!todo ? (
				<div className="TodoSkeleton" style={!darkMode ? { "--skeletonColor": "var(--bg-interact)" } : { "--skeletonColor": "var(--dark-bg-interact)" }}></div>
			) : (
				<section>
					<h3 className="pt-4">To-do</h3>
					<div className={!darkMode ? "todoList pt-3" : "todoList-dark pt-3"}>
						<div className={!darkMode ? "addTodoInput" : "addTodoInput-dark"}>
							<button onClick={() => addToDoItem(input)}>
								<i className="bi bi-plus-lg"></i>
							</button>
							<input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a new item..." onKeyDown={e => handleEnterInput(e, input)} />
						</div>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId="todo">
								{provided => (
									<ul {...provided.droppableProps} ref={provided.innerRef}>
										{todo.map((elm, idx) => {
											return (
												<Draggable key={idx} draggableId={`${idx}`} index={idx}>
													{provided => (
														<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
															<div style={{ width: "100%" }} className={isItemChecked(idx) === true ? "crossedItem" : ""}>
																<input type="checkbox" onChange={e => handleToDoItemCheck(idx, e)} onBlur={() => handleTodoUpdate(todo)} checked={elm.isDone ? true : false} />
																<input
																	type="text"
																	onKeyDown={e => manageBlockByKey(e, elm, idx)}
																	name={`todoItem${idx}`}
																	value={elm.text}
																	onChange={e => handleToDoItemText(idx, e)}
																	onBlur={() => handleTodoUpdate(todo)}
																/>
															</div>
															{toDoId === idx && (
																<button className={!darkMode ? "deleteTodo" : "deleteTodo-dark"} onClick={() => deleteTodo(idx)}>
																	<i className="bi bi-trash3"></i>
																</button>
															)}
														</li>
													)}
												</Draggable>
											)
										})}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				</section>
			)}
		</>
	)
}

export default ToDo
