import { useContext } from "react"

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
			<div className="eventMenu">
				<button onClick={() => openEventModal()} className="purple-outline-btn">
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
			<Modal className={darkMode && "modal-dark"} show={eventModal} onHide={closeEventModal} size={window.innerWidth > 800 ? "md" : "sm"}>
				<CreateEventForm closeEventModal={closeEventModal} />
			</Modal>
		</>
	)
}

export default EventMenu
