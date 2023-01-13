import React, { useState, useEffect, useContext, useMemo } from "react";

import calendarServices from "../services/calendar.service";

import CalIndexContext from "./calindex.context";
import { AuthContext } from "./auth.context";

import dayjs from "dayjs";

const CalendarWrapper = (props) => {

    const { user } = useContext(AuthContext)

    const [events, setEvents] = useState([])
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [eventModal, setEventModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [eventId, setEventId] = useState("")
    const [labels, setLabels] = useState([])

    const getEvents = () => {
        calendarServices
            .getCalendarByUser(user._id)
            .then(res => {
                setEvents(res.data[0].events)
            })
            .catch(err => console.log({ message: 'Internal Server Error', err }))
    }

    useEffect(() => {
        user && getEvents()
    }, [user])

    const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(event.tag)
        )
    }, [events, labels])

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

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(events.map(evt => evt.tag))].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true
                }
            })
        })
    }, [events])

    const updateLabel = (label) => {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }

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
            setEventId,
            setEvents,
            events,
            labels,
            setLabels,
            updateLabel,
            filteredEvents
        }}>
            {props.children}
        </CalIndexContext.Provider>
    )
}

export default CalendarWrapper