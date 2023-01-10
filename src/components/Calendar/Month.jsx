import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import CalIndexContext from "../../context/calindex.context"

import dayjs from "dayjs"

const Month = ({ currentMonth }) => {

	const { darkMode } = useContext(DarkModeContext)
	const { setDaySelected, setEventModal } = useContext(CalIndexContext)

	return (
		<>
			<div className="weekDays mt-4">
				{currentMonth[0].map((day, idx) => {
					return (
						<p key={idx}>{day.format("ddd").toUpperCase()}</p>
					)
				})}
			</div>
			<div className="month">
				{currentMonth.map((row, idx) => {
					return (
						<div key={idx}>
							{row.map((day, idx) => {
								const getCurrentDayClass = () => {
									return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "currentDay text-white" : "otherDay"
								}
								return (
									<>
										<div onClick={() => {
											setDaySelected(day)
											setEventModal(true)
										}} className={!darkMode ? "date" : "date-dark"} key={idx}>
											<p className={`${getCurrentDayClass()}`}>{day.format("DD")} </p>
										</div>
									</>
								)
							})}
						</div>
					)
				})}
			</div>
		</>
	)
}

export default Month
