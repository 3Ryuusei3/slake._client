import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from "../../context/calindex.context"

import Day from "./Day"

const Month = ({ currentMonth, events, setEvents }) => {
	const { darkMode } = useContext(DarkModeContext)
	const { setDaySelected, setEventModal } = useContext(CalIndexContext)

	return (
		<>
			<div className="weekDays mt-4">
				{currentMonth[0].map((day, idx) => {
					return <p key={idx}>{day.format("ddd").toUpperCase()}</p>
				})}
			</div>
			<div className="month">
				{currentMonth.map((row, idx) => {
					return (
						<div key={idx}>
							{row.map((day, idx) => (
								<div key={idx}>
									<Day events={events} setEvents={setEvents} day={day} />
								</div>
							))}
						</div>
					)
				})}
			</div>
		</>
	)
}

export default Month
