import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from "../../context/calindex.context"

import CreateEventForm from "./CreateEventForm"

import { Modal } from "react-bootstrap"

const EventMenu = () => {
	const { eventModal, setEventModal, labels, updateLabel } = useContext(CalIndexContext)
	const { darkMode } = useContext(DarkModeContext)

	const closeEventModal = () => {
		setEventModal(false)
	}

	return (
		<>
			<div className="eventMenu">
				{/* <button onClick={() => openEventModal()} className={!darkMode ? "addEventBtn" : "addEventBtn-dark"}>
					<i className="bi bi-plus-lg"></i>
				</button> */}

				<div className="tagContainer">
					{labels
						.sort((a, b) => (b.label > a.label ? 1 : a.label > b.label ? -1 : 0))
						.map(({ label: lbl, checked }, idx) => (
							<label key={idx}>
								<input type="checkbox" checked={checked} onChange={() => updateLabel({ label: lbl, checked: !checked })} className={` eventBlock`} />
								<span>{lbl}</span>
							</label>
						))}
				</div>
			</div>
			<Modal className={darkMode ? "modal-dark mt-5" : "mt-5"} show={eventModal} onHide={closeEventModal} size={window.innerWidth > 800 ? "md" : "sm"}>
				<CreateEventForm closeEventModal={closeEventModal} />
			</Modal>
		</>
	)
}

export default EventMenu
