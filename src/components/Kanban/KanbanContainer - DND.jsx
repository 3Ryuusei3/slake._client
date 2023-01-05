import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import kanbanServices from "../../services/kanban.service"

import Board from "react-trello"
import { Instagram } from "react-content-loader"


const KanbanContainer = () => {
	const [lanes, setLanes] = useState()

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)

	const getKanbanData = () => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				setLanes({ lanes: res.data[0].lanes })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getKanbanData()
	}, [])

	const handleKanbanUpdate = data => {
		kanbanServices
			.getKanbanByUser(user._id)
			.then(res => {
				return kanbanServices.updateKanban(res.data[0]._id, { lanes: data })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleOnDragEnd = (result, lanes, setLanes) => {
		if (!result.destination) return
		const { source, destination } = result

		if (source.droppableId !== destination.droppableId) {

			const sourceColumn = lanes[source.droppableId]
			const destColumn = lanes[destination.droppableId]
			const sourceCards = [...sourceColumn.cards]
			const destCards = [...destColumn.cards]

			const [removed] = sourceCards.splice(source.index, 1)
			destCards.splice(destination.index, 0, removed)
			setLanes({
				...lanes,
				[source.droppableId]: {
					...sourceColumn,
					cards: sourceCards
				},
				[destination.droppableId]: {
					...destColumn,
					cards: destCards
				}
			})
		} else {
			const column = lanes.lanes[source.droppableId];
			console.log("Column", column)

			const copiedCards = [...column.cards];
			console.log("copiedCards", copiedCards)

			const [removed] = copiedCards.splice(source.index, 1)
			copiedCards.splice(destination.index, 0, removed)
			setLanes({
				lanes: {
					...lanes,
					lanes: {
						0: {
							cards: copiedCards
						}
					}
				}

			})
			/* } */
		}

		return (
			<>
				{!lanes ? (
					<div className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
						<Instagram />
					</div>
				) : (

					<section className={!isSidebarOpen ? "mt-4 rightMargin leftPaddingSm" : "mt-4 rightMargin leftPaddingLg"}>
						{/* <Board
						onDataChange={data => {
							handleKanbanUpdate(data)
						}}
						editable
						draggable
						editLaneTitle
						data={lanes}
					/> */}
						{/* <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, lanes, setLanes)}>
						<div className="d-flex gap-5">
							<div className="lane" key={lanes.lanes[0]._id}>
								<h3>{lanes.lanes[0].title}</h3>
								<Droppable droppableId={"0"}>
									{provided => (
										<ul {...provided.droppableProps} ref={provided.innerRef}>
											{lanes.lanes[0].cards.map((elm, idx) => {
												return (
													<Draggable key={idx} draggableId={`${idx}`} index={idx}>
														{provided => (
															<li className='py-2' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
																<h5>{elm.title}</h5>
																<p>{elm.description}</p>
															</li>)}
													</Draggable>
												)
											})}
											{provided.placeholder}
										</ul>)}
								</Droppable>
							</div>
						</div>
					</DragDropContext> */}
						<DragDropContext onDragEnd={(result) => handleOnDragEnd(result, lanes, setLanes)}>
							<div className="d-flex gap-5">
								{lanes.lanes.map((elm) => {
									return (
										<div className="lane" key={elm._id}>
											<h3>{elm.title}</h3>
											<Droppable droppableId={elm.title}>
												{provided => (
													<ul {...provided.droppableProps} ref={provided.innerRef}>
														{elm.cards.map((elm, idx) => {
															return (
																<Draggable key={idx} draggableId={`${idx}`} index={idx}>
																	{provided => (
																		<li className='py-2' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
																			<h5>{elm.title}</h5>
																			<p>{elm.description}</p>
																		</li>)}
																</Draggable>
															)
														})}
														{provided.placeholder}
													</ul>)}
											</Droppable>
										</div>
									)
								})}
							</div>
						</DragDropContext>
					</section>
				)}
			</>
		)
	}
}


export default KanbanContainer
