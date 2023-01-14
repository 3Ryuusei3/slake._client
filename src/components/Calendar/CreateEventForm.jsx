import { useContext, useState } from "react"

import calendarServices from "../../services/calendar.service"

import { DarkModeContext } from "../../context/darkmode.context"
import { AuthContext } from "../../context/auth.context"
import CalIndexContext from "../../context/calindex.context"

import { Modal, Button, Form } from "react-bootstrap"

const CreateEventForm = ({ closeEventModal }) => {
	const { daySelected, selectedEvent, setSelectedEvent, eventId, setEventId, events, setEvents } = useContext(CalIndexContext)

	/* PENDIENTE: Pasar a carpeta const e importar */
	const labels = [
		{ tag: "Personal", color: "Blue" },
		{ tag: "Work", color: "Red" },
		{ tag: "School", color: "Yellow" },
		{ tag: "Travel", color: "Green" },
		{ tag: "Social", color: "Orange" },
		{ tag: "Other", color: "Purple" },
		{ tag: "Birthday", color: "Theme" },
	]

	const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? selectedEvent.tag : "Diary")
	const [eventData, setEventData] = useState({
		title: selectedEvent ? selectedEvent.title : "",
		description: selectedEvent ? selectedEvent.description : "",
		startDate: selectedEvent ? selectedEvent.startDate : "",
		time: selectedEvent ? selectedEvent.time : "",
		/* finishDate: "", */
		tag: selectedLabel,
	})

	const { user } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)

	const handleInputChange = e => {
		const { value, name } = e.target
		setEventData({ ...eventData, [name]: value })
	}

	const handleFormSubmit = (e, newEvent) => {
		e.preventDefault()
		newEvent.startDate = daySelected.valueOf()

		calendarServices
			.getCalendarByUser(user._id)
			.then(res => {
				return calendarServices.updateEvents(res.data[0]._id, [...events, newEvent])
			})
			.then(() => {
				setEvents([...events, newEvent])
				closeEventModal(false)
			})
			.catch(err => console.log({ message: "Internal Server Error", err }))
	}

	const updateEvents = evt => {
		calendarServices
			.getCalendarByUser(user._id)
			.then(res => {
				return calendarServices.updateEvents(res.data[0]._id, [...evt])
			})
			.catch(err => console.log({ message: "Internal Server Error", err }))
	}

	const handleDeleteEvent = id => {
		const eventsCopy = [...events]

		const remainingEvents = eventsCopy.filter(event => event.startDate + event.title !== id)
		setSelectedEvent(null)
		setEventId("")
		finalHandleActions(remainingEvents)
	}

	const handleUpdateEvent = id => {
		const eventsCopy = [...events]
		const idToFind = event => event.startDate + event.title === id
		const idToUpdate = eventsCopy.findIndex(idToFind)

		eventsCopy[idToUpdate].title = eventData.title
		eventsCopy[idToUpdate].description = eventData.description
		eventsCopy[idToUpdate].tag = eventData.tag
		eventsCopy[idToUpdate].time = eventData.time
		finalHandleActions(eventsCopy)
	}

	/* PENDIENTE: Imitar en TODO y TextEditor */
	const finalHandleActions = list => {
		setEvents(list)
		closeEventModal(false)
		updateEvents(list)
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{daySelected.format("dddd, MMMM, DD")}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={e => handleFormSubmit(e, eventData)}>
					<Form.Group controlId="title">
						<Form.Label className="text-muted">Title</Form.Label>
						<Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.title} name="title" onChange={handleInputChange} placeholder="Add a title..." />
					</Form.Group>

					<Form.Group controlId="description">
						<Form.Label className="text-muted">Description</Form.Label>
						<Form.Control
							className={darkMode && "form-control-dark"}
							as="textarea"
							rows={3}
							value={eventData.description}
							name="description"
							onChange={handleInputChange}
							placeholder="Add a description..."
						/>
					</Form.Group>

					<Form.Group controlId="time">
						<Form.Label className="text-muted">Time</Form.Label>
						<Form.Control className={darkMode && "form-control-dark"} type="time" value={eventData.time} name="time" onChange={handleInputChange} placeholder="Add a time..." />
					</Form.Group>

					<Form.Group controlId="labels">
						<Form.Label className="text-muted">Label</Form.Label>

						<div className="d-flex gap-2">
							{labels.map((lbl, idx) => {
								return (
									<div
										key={idx}
										onClick={() => {
											setSelectedLabel(lbl.tag)
											setEventData({ ...eventData, tag: lbl.tag })
										}}
										className={`colorText${lbl.color} eventBlock`}
									>
										{selectedLabel === lbl.tag && <i className="bi bi-check-lg text-white"></i>}
									</div>
								)
							})}
						</div>
					</Form.Group>

					{!selectedEvent ? (
						<Button
							disabled={eventData.title ? false : true}
							type="submit"
							className={eventData.title ? "purple-outline-btn px-5 mt-5" : "gray-outline-btn px-5 mt-5"}
							style={{ maxWidth: "max-content", marginInline: "auto" }}
						>
							Create event
						</Button>
					) : (
						<>
							<Button className="purple-outline-btn px-5 mt-4" style={{ maxWidth: "max-content", marginInline: "auto" }} onClick={() => handleUpdateEvent(eventId)}>
								Update event
							</Button>
							<Button className="red-outline-btn px-5 mt-2" style={{ maxWidth: "max-content", marginInline: "auto" }} onClick={() => handleDeleteEvent(eventId)}>
								Delete event
							</Button>
						</>
					)}
				</Form>
			</Modal.Body>
		</>
	)
}

export default CreateEventForm
