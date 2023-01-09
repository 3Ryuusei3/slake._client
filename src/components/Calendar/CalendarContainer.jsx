import { useState, useContext, useEffect } from 'react'

import CalIndexContext from '../../context/calindex.context'

import getMonth from '../../utils/calendar.utils'

import Month from './Month'
import CalendarMenu from './CalendarMenu'

const CalendarContainer = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex } = useContext(CalIndexContext)


    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])

    return (
        <>
            <CalendarMenu />
            <Month currentMonth={currentMonth} />
        </>
    )

}

export default CalendarContainer