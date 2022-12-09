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
	)
}

export default KanbanContainer
