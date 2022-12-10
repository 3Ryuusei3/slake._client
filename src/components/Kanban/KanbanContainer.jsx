import { useEffect, useState } from "react"
import Board from "react-trello"

function KanbanContainer({ isSidebarOpen }) {
	const [kanban, setKanban] = useState([])

	useEffect(() => {
		setKanban(data)
	}, [])

	const data = {
		lanes: [
			{
				id: "lane1",
				title: "Planned Tasks",
				label: "2/2",
				cards: [
					{ id: "Card1", title: "Write Blog", description: "Can AI make memes", label: "30 mins", draggable: false },
					{ id: "Card2", title: "Pay Rent", description: "Transfer via NEFT", label: "5 mins", metadata: { sha: "be312a1" } },
				],
			},
			{
				id: "lane2",
				title: "Completed",
				label: "0/0",
				cards: [],
			},
		],
	}

	return (
		<div className="me-6 mt-4" style={!isSidebarOpen ? { marginLeft: "150px", transition: "0.3s ease", position: "relative" } : { marginLeft: "300px", transition: "0.4s ease", position: "relative" }}>
			<Board editable draggable canAddLanes collapsibleLanes editLaneTitle data={data} />
		</div>
	)
}

export default KanbanContainer

/* 

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

*/
