import { useContext, useEffect, useState } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from "../../context/calindex.context"

import dayjs from "dayjs"

const Day = ({ day, events, setEvents }) => {
	const [dayEvents, setDayEvents] = useState([])

	const { darkMode } = useContext(DarkModeContext)
	const { setDaySelected, setEventModal, setSelectedEvent, eventId, setEventId } = useContext(CalIndexContext)

	useEffect(() => {
		const eventsFiltered = events.filter(event => dayjs(event.startDate).format("DD-MM-YY") === day.format("DD-MM-YY"))
		setDayEvents(eventsFiltered)
	}, [events, day])

	const getCurrentDayClass = () => {
		return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "currentDay text-white" : "otherDay"
	}

	const handleMouseOver = id => {
		setEventId(id)
	}

	const handleMouseOut = () => {
		setEventId("")
	}

	console.log(eventId)

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
					<div style={{ height: "30px", maxHeight: "30px" }} /* onMouseOver={() => handleMouseOver(event._id)} onMouseOut={handleMouseOut}  */>
						<p
							onClick={() => {
								setSelectedEvent(event)
								setEventId(event.startDate)
							}}
							key={idx}
							className={!darkMode ? `eventLine ${event.tag}Category fontLight` : `eventLine-dark ${event.tag}CategoryDark fontDark`}
						>
							{event.title}
						</p>
					</div>
				)
			})}
		</div>
	)
}

export default Day
