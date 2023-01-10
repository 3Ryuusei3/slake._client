import { useState, useContext, useEffect } from 'react'

import CalIndexContext from '../../context/calindex.context'

import getMonth from '../../utils/calendar.utils'

import SmallCalendar from './SmallCalendar'
import CalendarMenu from './CalendarMenu'
import Month from './Month'
import EventMenu from './EventMenu'


const CalendarContainer = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex } = useContext(CalIndexContext)


    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])

    return (
        <>
            <div className='d-flex'>
                <SmallCalendar />
                <EventMenu />
            </div>
            <CalendarMenu />
            <Month currentMonth={currentMonth} />
        </>
    )

}

export default CalendarContainer