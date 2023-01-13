import { useState, useContext, useEffect } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from "../../context/calindex.context"

import { Modal } from "react-bootstrap"
import CreateEventForm from "./CreateEventForm"

const EventMenu = () => {
	const { eventModal, setEventModal, labels, updateLabel } = useContext(CalIndexContext)
	const { darkMode } = useContext(DarkModeContext)

	const openEventModal = () => setEventModal(true)
	const closeEventModal = () => {
		setEventModal(false)
	}

	return (
		<>
			<div>
				<button onClick={() => openEventModal()} className="purple-outline-btn mt-3 px-4">
					New event
				</button>

				<div className="tagContainer">
					{labels.map(({ label: lbl, checked }, idx) => (
						<label key={idx}>
							<input type="checkbox" checked={checked} onChange={() => updateLabel({ label: lbl, checked: !checked })} className={`colorText${lbl} eventBlock`} />
							<span>{lbl}</span>
						</label>
					))}
				</div>
			</div>
			<Modal className={darkMode && "modal-dark"} show={eventModal} onHide={closeEventModal}>
				<Modal.Header closeButton>
					<Modal.Title>Add Event</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreateEventForm closeEventModal={closeEventModal} />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default EventMenu
