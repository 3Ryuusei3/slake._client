import { useContext, useState } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import { Button, Form } from "react-bootstrap"
import CalIndexContext from "../../context/calindex.context"


const CreateEventForm = ({ eventData, setEventData }) => {

    const { daySelected } = useContext(CalIndexContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setEventData({ ...eventData, [name]: value })
    }

    const { darkMode } = useContext(DarkModeContext)

    const labelsClasses = ["Blue", "Red", "Yellow", "Green", "Orange", "Purple"]

    const [selectedLabel, setSelectedLabel] = useState("")
    // selectedEvent
    //     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
    //     : labelsClasses[0] )

    return (
        <Form>
            <Form.Group controlId="title">
                <Form.Label className="text-muted">Title</Form.Label>
                <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.title} name="title" onChange={handleInputChange} placeholder="Add a title..." />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label className="text-muted">Description</Form.Label>
                <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.description} name="description" onChange={handleInputChange} placeholder="Add a description..." />
            </Form.Group>

            <Form.Group controlId="labels">
                <Form.Label className="text-muted">Label</Form.Label>

                <div className="d-flex gap-2">
                    {labelsClasses.map((lbl, idx) => {
                        return (
                            <div key={idx} onClick={() => setSelectedLabel(lbl)} className={`colorText${lbl} eventBlock`}>
                                {selectedLabel === lbl && (
                                    <i className="bi bi-check-lg text-white"></i>
                                )}
                            </div>

                        )
                    })}
                </div>
                {/* <Form.Control className={darkMode && "form-control-dark"} type="text" value={eventData.tag} name="description" onChange={handleInputChange} placeholder="Add a description..." /> */}
            </Form.Group>

            <div style={{ maxWidth: "max-content", marginInline: "auto" }} className="px-3 mt-3">
                <p>{daySelected.format("dddd, MMMM, DD")}</p>
            </div>

            <Button type="submit" className="purple-outline-btn px-5 mt-5" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                Create event
            </Button>
        </Form>
    )
}

export default CreateEventForm