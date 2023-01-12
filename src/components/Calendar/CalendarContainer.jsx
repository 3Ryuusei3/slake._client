import { useState, useContext, useEffect } from 'react'

import CalIndexContext from '../../context/calindex.context'
import { AuthContext } from "../../context/auth.context"

import getMonth from '../../utils/calendar.utils'

import calendarServices from "../../services/calendar.service"

import SmallCalendar from './SmallCalendar'
import CalendarMenu from './CalendarMenu'
import Month from './Month'
import EventMenu from './EventMenu'


const CalendarContainer = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const [events, setEvents] = useState()
    const { user } = useContext(AuthContext)
    const { monthIndex } = useContext(CalIndexContext)

    const getEvents = () => {
        calendarServices
            .getCalendarByUser(user._id)
            .then(res => {
                setEvents(res.data[0].events)
            })
            .catch(err => console.log({ message: 'Internal Server Error', err }))
    }

    useEffect(() => {
        getEvents()
    }, [])


    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])

    return (
        <>
            <div className='d-flex'>
                <SmallCalendar />
                <EventMenu events={events} setEvents={setEvents} />
            </div>
            <CalendarMenu />
            <Month currentMonth={currentMonth} />
        </>
    )

}

export default CalendarContainer