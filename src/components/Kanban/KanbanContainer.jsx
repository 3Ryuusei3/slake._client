import { useEffect, useState } from "react"
import data from "./data.json"
import Column from "./Column"
import { DragDropContext } from "react-beautiful-dnd"

function KanbanContainer({ isSidebarOpen }) {
	const [kanban, setKanban] = useState([])

	useEffect(() => {
		setKanban(data)
	}, [])

	const onDragEnd = result => {}

	return (
		<div className="me-6 mt-4" style={!isSidebarOpen ? { marginLeft: "150px", transition: "0.3s ease", position: "relative" } : { marginLeft: "300px", transition: "0.4s ease", position: "relative" }}>
			<DragDropContext onDragEnd={onDragEnd}>
				{kanban.map((kan, idx) => {
					const columnId = kan.column.map(col => {
						return col._id
					})
					const columnTitle = kan.column.map(col => {
						return col.title
					})
					const tasks = kan.column.map(col => {
						return col.cards.map(card => card)
					})
					return <Column isSidebarOpen={isSidebarOpen} key={idx} tasks={tasks} columnTitle={columnTitle} columnId={columnId} />
				})}
			</DragDropContext>
		</div>
	)
}

export default KanbanContainer
