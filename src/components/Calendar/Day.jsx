import { useContext, useEffect, useState } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from "../../context/calindex.context"

import dayjs from "dayjs"

const Day = ({ day }) => {
	const [dayEvents, setDayEvents] = useState([])

	const { darkMode } = useContext(DarkModeContext)
	const { setDaySelected, setEventModal, setSelectedEvent, /* eventId, */ setEventId, filteredEvents } = useContext(CalIndexContext)

	useEffect(() => {
		const eventsFiltered = filteredEvents.filter(event => dayjs(event.startDate).format("DD-MM-YY") === day.format("DD-MM-YY"))
		setDayEvents(eventsFiltered)
	}, [filteredEvents, day])

	const getCurrentDayClass = () => {
		return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "currentDay text-white" : "otherDay"
	}

	/* const handleMouseOver = id => {
		setEventId(id)
	}

	const handleMouseOut = () => {
		setEventId("")
	} */

	return (
		<div
			onClick={() => {
				setDaySelected(day)
				setEventModal(true)
			}}
			className={!darkMode ? "date" : "date-dark"}
		>
			<p className={`${getCurrentDayClass()}`}>{day.format("DD")} </p>
			{dayEvents.map((event, idx) => {
				return (
					<div
						onClick={() => {
							setSelectedEvent(event)
							setEventId(event.startDate + event.title)
						}}
						className={!darkMode ? `${event.tag}Category` : `${event.tag}CategoryDark`}
						key={idx} /* onMouseOver={() => handleMouseOver(event._id)} onMouseOut={handleMouseOut}  */
					>
						<p className={!darkMode ? `eventLine fontLight` : `eventLine-dark fontDark`}>{event.title}</p>
						<p className="eventTime">{event.time}</p>
					</div>
				)
			})}
		</div>
	)
}

export default Day
