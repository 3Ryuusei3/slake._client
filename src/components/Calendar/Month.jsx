import dayjs from "dayjs"
import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

const Month = ({ currentMonth }) => {
	const { darkMode } = useContext(DarkModeContext)
	return (
		<>
			<div className="weekDays mt-4">
				<p>SUN</p>
				<p>MON</p>
				<p>TUE</p>
				<p>WED</p>
				<p>THU</p>
				<p>FRI</p>
				<p>SAT</p>
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
									<div className={!darkMode ? "date" : "date-dark"} key={idx}>
										{/* <p className="weekDay">{day.format("ddd").toUpperCase()}</p> */}
										<p className={`${getCurrentDayClass()}`}>{day.format("DD")} </p>
									</div>
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
