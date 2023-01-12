import { useState, useContext, useEffect } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from '../../context/calindex.context'

import { Modal } from "react-bootstrap"
import CreateEventForm from "./CreateEventForm"


const EventMenu = ({ events, setEvents }) => {


    const { eventModal, setEventModal } = useContext(CalIndexContext)



    const { darkMode } = useContext(DarkModeContext)

    const openEventModal = () => setEventModal(true)
    const closeEventModal = () => setEventModal(false)

    return (
        <>
            <div>
                <button onClick={() => openEventModal()} className="purple-outline-btn mt-3 px-4">
                    New event
                </button>
            </div>
            <Modal className={darkMode && "modal-dark"} show={eventModal} onHide={closeEventModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateEventForm events={events} setEvents={setEvents} closeEventModal={closeEventModal} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EventMenu
