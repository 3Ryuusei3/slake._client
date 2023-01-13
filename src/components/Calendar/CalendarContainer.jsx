import { useState, useContext, useEffect } from "react"

import CalIndexContext from "../../context/calindex.context"

import getMonth from "../../utils/calendar.utils"

import SmallCalendar from "./SmallCalendar"
import CalendarHeader from "./CalendarHeader"
import Month from "./Month"
import EventMenu from "./EventMenu"

const CalendarContainer = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth())

	const { monthIndex } = useContext(CalIndexContext)

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex))
	}, [monthIndex])

	return (
		<>
			<div className="calendarMenu">
				<SmallCalendar />
				<EventMenu />
			</div>
			<calendarHeader />
			<Month currentMonth={currentMonth} />
		</>
	)
}

export default CalendarContainer
