import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"

const Container = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: white;
`

function Task({ task, idx }) {
	return (
		<Draggable draggableId={task._id} index={idx}>
			{provided => (
				<Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<div>{task.text}</div>
				</Container>
			)}
		</Draggable>
	)
}

export default Task
