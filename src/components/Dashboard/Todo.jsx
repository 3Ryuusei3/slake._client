import { useState } from "react"

function ToDo({ isSidebarOpen }) {
	const [toDoList, setToDoList] = useState([])
	const [input, setInput] = useState("")

	const addToDoItem = item => {
		const newToDo = {
			id: Math.random(),
			text: item,
		}
		setToDoList([...toDoList, newToDo])
		setInput("")
	}

	const deleteTodo = id => {
		const newToDoList = toDoList.filter(elm => elm.id !== id)

		setToDoList(newToDoList)
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
					{toDoList.map(elm => {
						return (
							<li key={elm.id}>
								<div>
									<input type="checkbox" />
									<input type="text" value={elm.text} />
								</div>
								<button className="deleteTodo" onClick={() => deleteTodo(elm.id)}>
									<i className="bi bi-x-lg"></i>
								</button>
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

    <li>
        <input type="checkbox" />
        <input type="text" name="" id="" value="Buy tomatoes" />
    </li>
    <li>
        <input type="checkbox" />
        <input type="text" name="" id="" value="Finish project" />
    </li>
    <li>
        <input type="checkbox" />
        <input type="text" name="" id="" value="Go to Uniqlo" />
    </li>

*/
