import { useContext, useState } from "react"

import calendarServices from "../../services/calendar.service"

import { DarkModeContext } from "../../context/darkmode.context"
import { AuthContext } from "../../context/auth.context"
import CalIndexContext from "../../context/calindex.context"

import { Button, Form } from "react-bootstrap"

const CreateEventForm = ({ events, setEvents, closeEventModal }) => {

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        startDate: "",
        /* finishDate: "", */
        tag: ""
    })

    const { daySelected } = useContext(CalIndexContext)
    const { user } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setEventData({ ...eventData, [name]: value })
    }

    const { darkMode } = useContext(DarkModeContext)

    /* PENDIENTE: Pasar a carpeta const e importar */
    const labels = [
        { tag: "Diary", color: "Blue" },
        { tag: "Work", color: "Red" },
        { tag: "School", color: "Yellow" },
        { tag: "Travel", color: "Green" },
        { tag: "Social", color: "Orange" },
        { tag: "Other", color: "Purple" }
    ]

    const [selectedLabel, setSelectedLabel] = useState("")
    // selectedEvent
    //     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
    //     : labelsClasses[0] )

    const handleFormSubmit = (e, newEvent) => {
        e.preventDefault()
        newEvent.startDate = daySelected.$d.toString()

        console.log("newEvent:", newEvent)

        calendarServices
            .getCalendarByUser(user._id)
            .then(res => {
                return calendarServices.updateEvent(res.data[0]._id, [...events, newEvent])
            })
            .then(() => {
                setEvents([...events, newEvent])
                closeEventModal(false)
                setEventData({
                    title: "",
                    description: "",
                    startDate: "",
                    finishDate: "",
                    tag: ""
                })
            })
            .catch(err => console.log({ message: 'Internal Server Error', err }))
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

            <Button type="submit" className="purple-outline-btn px-5 mt-5" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                Create event
            </Button>
        </Form>
    )
}

export default CreateEventForm


{/* <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.tag} name="description" onChange={handleInputChange} placeholder="Add a description..." /> */ }