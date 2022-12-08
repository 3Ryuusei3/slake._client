import { useState } from "react"

function ToDo({ isSidebarOpen, dashboardData }) {
	const [toDoList, setToDoList] = useState([...dashboardData.todo])
	const [input, setInput] = useState("")
	const [toDoId, setToDoId] = useState("")

	const addToDoItem = item => {
		const newToDo = {
			isDone: false,
			text: item,
		}
		setToDoList([...toDoList, newToDo])
		setInput("")
	}

	const deleteTodo = id => {
		const newToDoList = toDoList.filter(elm => elm.id !== id)
		setToDoList(newToDoList)
	}

	const handleMouseOver = id => {
		setToDoId(id)
	}

	const handleMouseOut = () => {
		setToDoId("")
	}

	console.log(toDoList)

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
					{toDoList.map((elm, idx) => {
						return (
							<li key={idx} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
								<div style={{ width: "100%" }}>
									<input type="checkbox" />
									<input type="text" name={`todo${elm.id}`} value={elm.text} onChange={() => {}} />
								</div>
								{toDoId === idx && (
									<button className="deleteTodo" onClick={() => deleteTodo(elm.id)}>
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

/* 

const handleInputChange = (e, id) => {
		const { name, value } = e.target
		/* setToDoList(...toDoList[id], toDoList[id].name: value)
	}

onChange={() => {
											handleInputChange(idx)
										}}
*/
