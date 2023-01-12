import React, { useState, useEffect } from "react";
import CalIndexContext from "./calindex.context";
import dayjs from "dayjs";

const CalendarWrapper = (props) => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [eventModal, setEventModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [eventId, setEventId] = useState("")

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        if (!eventModal) {
            setSelectedEvent(null)
        }
    }, [eventModal])

    return (
        <CalIndexContext.Provider value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            eventModal,
            setEventModal,
            selectedEvent,
            setSelectedEvent,
            eventId,
            setEventId
        }}>
            {props.children}
        </CalIndexContext.Provider>
    )
}

export default CalendarWrapper