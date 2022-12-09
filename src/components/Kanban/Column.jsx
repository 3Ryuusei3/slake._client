import Task from "./Task"
import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd"

const Container = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
`
const Title = styled.h3`
	padding: 8px;
`
const TaskList = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px;
	width: 33%;
`

function Column({ isSidebarOpen, tasks, columnTitle, columnId }) {
	return (
		<Container>
			<Title>{columnTitle}</Title>
			<Droppable droppableId={columnId[0]}>
				{provided => (
					<>
						<TaskList ref={provided.innerRef} {...provided.droppableProps}>
							{tasks[0].map((task, idx) => {
								return <Task key={task._id} task={task} idx={idx} />
							})}
							{provided.placeholder}
						</TaskList>
					</>
				)}
			</Droppable>
		</Container>
	)
}

export default Column
