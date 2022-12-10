import { useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import dashboardServices from "../../services/dashboard.service"


function ToDo({ isSidebarOpen, dashboardData }) {
	const [todo, setTodo] = useState([...dashboardData.todo])
	const [input, setInput] = useState("")
	const [toDoId, setToDoId] = useState("")

	const { user } = useContext(AuthContext)

	const addToDoItem = item => {
		const newToDo = {
			text: item,
			isDone: false,
		}
		setTodo([...todo, newToDo])
		handleTodoUpdate()
		setInput("")
	}

	const deleteTodo = (idx, e) => {
		let newToDoList = [...todo]
		newToDoList.splice(idx, 1)
		setTodo(newToDoList)
		handleTodoUpdate()
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
		setTodo(toDoListCopy)
	}

	const handleToDoItemCheck = (i, e) => {
		let toDoListCopy = [...todo]
		toDoListCopy[i].isDone = !toDoListCopy[i].isDone
		setTodo(toDoListCopy)
	}

	const handleTodoUpdate = () => {

		dashboardServices
			.getDashboardByUser(user._id)
			.then(res => {
				return dashboardServices.updateTodo(res.data[0]._id, [...todo])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const isItemChecked = i => {
		return todo[i].isDone ? true : false
	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"}>
			<h3 className="pt-5">To-do</h3>
			<div className="todoList pt-3">
				<div className="addTodoInput">
					<button onClick={() => addToDoItem(input)}>
						<i className="bi bi-plus-lg"></i>
					</button>
					<input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a new item..." />
				</div>
				<ul>
					{todo.map((elm, idx) => {
						return (
							<li key={idx} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
								<div style={{ width: "100%" }} className={isItemChecked(idx) === true ? "crossedItem" : ""}>
									<input type="checkbox" onChange={e => handleToDoItemCheck(idx, e)} />
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
				</ul>
			</div>
		</div>
	)
}

export default ToDo

