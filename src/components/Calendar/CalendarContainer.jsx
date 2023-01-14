import { useState, useContext, useEffect } from "react"

import CalIndexContext from "../../context/calindex.context"
import { DarkModeContext } from "../../context/darkmode.context"

import getMonth from "../../utils/calendar.utils"

import SmallCalendar from "./SmallCalendar"
import CalendarHeader from "./CalendarHeader"
import Month from "./Month"
import EventMenu from "./EventMenu"

const CalendarContainer = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth())
	const [calendarMenu, setCalendarMenu] = useState(false)

	const { monthIndex } = useContext(CalIndexContext)
	const { darkMode } = useContext(DarkModeContext)

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex))
	}, [monthIndex])

	return (
		<>
			<button
				onClick={() => {
					setCalendarMenu(val => !val)
				}}
				style={calendarMenu ? { rotate: "-90deg", transition: "0.4s ease" } : { rotate: "0deg", transition: "0.4s ease" }}
				className={!darkMode ? "topMenuBtn" : "topMenuBtn-dark"}
			>
				<i className="bi bi-three-dots-vertical"></i>
			</button>
			<div className="calContainer">
				{calendarMenu && (
					<div className={!darkMode ? "calendarMenu mt-3" : "calendarMenu-dark mt-3"}>
						<SmallCalendar />
						<EventMenu />
					</div>
				)}
				<div style={{ width: "100%" }}>
					<div style={{ display: "none" }}>
						<EventMenu />
					</div>
					<CalendarHeader />
					<Month currentMonth={currentMonth} />
				</div>
			</div>
		</>
	)
}

export default CalendarContainer
