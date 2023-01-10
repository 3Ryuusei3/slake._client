import { useState, useEffect, useContext } from "react"

import dayjs from "dayjs"
import getMonth from "../../utils/calendar.utils"
import CalIndexContext from "../../context/calindex.context"



const SmallCalendar = () => {

    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx))
    }, [currentMonthIdx])

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(CalIndexContext)

    useEffect(() => {
        setCurrentMonthIdx(monthIndex)
    }, [monthIndex])

    const handlePrevMonth = () => {
        setCurrentMonthIdx(currentMonthIdx - 1)
    }

    const handleNextMonth = () => {
        setCurrentMonthIdx(currentMonthIdx + 1)
    }

    const getDayClass = (day) => {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "currentDay";
        } else if (currDay === slcDay) {
            return "selectedDay";
        } else {
            return "otherDay";
        }
    }

    return (
        <div className="pt-3">
            <header className="d-flex">
                <p className="m-0">{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}</p>
                <button onClick={() => handlePrevMonth()}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button onClick={() => handleNextMonth()}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            </header>
            <div className="d-flex flex-column mt-4">
                <div className="smWeekDays">
                    {currentMonth[0].map((day, idx) => {
                        return (
                            <p key={idx}>{day.format("dd").charAt(0)}</p>
                        )
                    })}
                </div>
                <div className="smMonth">
                    {currentMonth.map((row, idx) => {
                        return (
                            <div key={idx}>
                                {row.map((day, idx) => {
                                    return (
                                        <button onClick={() => {
                                            setSmallCalendarMonth(currentMonthIdx)
                                            setDaySelected(day)
                                        }
                                        } className={`${getDayClass(day)}`} key={idx}>
                                            {day.format("D")}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default SmallCalendar