import { useContext } from "react"

import dayjs from "dayjs"

import CalIndexContext from "../../context/calindex.context"
import { DarkModeContext } from "../../context/darkmode.context"

const CalendarHeader = () => {
	const { monthIndex, setMonthIndex } = useContext(CalIndexContext)

	const { darkMode } = useContext(DarkModeContext)

	const handlePrevMonth = () => {
		setMonthIndex(monthIndex - 1)
	}

	const handleNextMonth = () => {
		setMonthIndex(monthIndex + 1)
	}

	const handleReset = () => {
		setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month())
	}

	return (
		<div className={!darkMode ? "calendarHeader mt-4" : "calendarHeader-dark mt-4"}>
			<h4 className="d-inline m-0">{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h4>
			<div>
				<button onClick={() => handlePrevMonth()}>
					<i className="bi bi-chevron-left"></i>
				</button>
				<button className="todayBtn mx-2 pb-1" onClick={() => handleReset()}>
					Today
				</button>

				<button onClick={() => handleNextMonth()}>
					<i className="bi bi-chevron-right"></i>
				</button>
			</div>
		</div>
	)
}

export default CalendarHeader
