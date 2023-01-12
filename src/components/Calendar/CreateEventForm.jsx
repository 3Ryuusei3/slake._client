import { useContext, useState } from "react"

import calendarServices from "../../services/calendar.service"

import { DarkModeContext } from "../../context/darkmode.context"
import { AuthContext } from "../../context/auth.context"
import CalIndexContext from "../../context/calindex.context"

import { Button, Form } from "react-bootstrap"

const CreateEventForm = ({ events, setEvents, closeEventModal }) => {

    const { daySelected, selectedEvent, eventId, setEventId } = useContext(CalIndexContext)

    /* PENDIENTE: Pasar a carpeta const e importar */
    const labels = [
        { tag: "Diary", color: "Blue" },
        { tag: "Work", color: "Red" },
        { tag: "School", color: "Yellow" },
        { tag: "Travel", color: "Green" },
        { tag: "Social", color: "Orange" },
        { tag: "Other", color: "Purple" }
    ]

    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? selectedEvent.tag : "Diary")
    const [eventData, setEventData] = useState({
        title: selectedEvent ? selectedEvent.title : "",
        description: selectedEvent ? selectedEvent.description : "",
        startDate: selectedEvent ? selectedEvent.startDate : "",
        /* finishDate: "", */
        tag: selectedLabel
    })

    const { user } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setEventData({ ...eventData, [name]: value })
    }

    const { darkMode } = useContext(DarkModeContext)



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
            .catch(err => console.log({ message: 'Internal Server Error', err }))
    }

    const handleUpdateEvents = (evt) => {

        calendarServices
            .getCalendarByUser(user._id)
            .then(res => {
                return calendarServices.updateEvents(res.data[0]._id, [...evt])
            })
            .catch(err => console.log({ message: 'Internal Server Error', err }))
    }

    const handleDeleteEvent = (id) => {
        const eventsCopy = [...events]
        const remainingEvents = eventsCopy.filter(event => event.startDate != id)
        setEventId("")
        setEvents(remainingEvents)
        closeEventModal(false)
        handleUpdateEvents(remainingEvents)
    }

    return (
        <Form onSubmit={(e) => handleFormSubmit(e, eventData)}>
            <Form.Group controlId="title">
                <Form.Label className="text-muted">Title</Form.Label>
                <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.title} name="title" onChange={handleInputChange} placeholder="Add a title..." />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label className="text-muted">Description</Form.Label>
                <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.description} name="description" onChange={handleInputChange} placeholder="Add a description..." />
            </Form.Group>

            <div style={{ maxWidth: "max-content", marginInline: "auto" }} className="px-3 mt-3">
                <p>{daySelected.format("dddd, MMMM, DD")}</p>
            </div>

            <Form.Group controlId="labels">
                <Form.Label className="text-muted">Label</Form.Label>

                <div className="d-flex gap-2">
                    {labels.map((lbl, idx) => {
                        return (
                            <div key={idx}
                                onClick={() => {
                                    setSelectedLabel(lbl.tag)
                                    setEventData({ ...eventData, ["tag"]: lbl.tag })
                                }} className={`colorText${lbl.color} eventBlock`}>
                                {selectedLabel === lbl.tag && (
                                    <i className="bi bi-check-lg text-white"></i>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Form.Group>

            {!selectedEvent ? (
                <Button type="submit" className="purple-outline-btn px-5 mt-5" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                    Create event
                </Button>) : (
                <>
                    <Button className="purple-outline-btn px-5 mt-4" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                        Update event
                    </Button>
                    <Button className="red-outline-btn px-5 mt-2" style={{ maxWidth: "max-content", marginInline: "auto" }} onClick={() => handleDeleteEvent(eventId)}>
                        Delete event
                    </Button>
                </>
            )
            }

        </Form>
    )
}

export default CreateEventForm


{/* <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.tag} name="description" onChange={handleInputChange} placeholder="Add a description..." /> */ }