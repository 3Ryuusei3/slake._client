import React, { useState, useEffect } from "react";
import CalIndexContext from "./calindex.context";
import dayjs from "dayjs";

const CalendarWrapper = (props) => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [eventModal, setEventModal] = useState(false)

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    return (
        <CalIndexContext.Provider value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            eventModal,
            setEventModal
        }}>
            {props.children}
        </CalIndexContext.Provider>
    )
}

export default CalendarWrapper