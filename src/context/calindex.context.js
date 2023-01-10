import React from "react"

const CalIndexContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => { },
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => { },
    daySelected: null,
    setDaySelected: (day) => { },
    eventModal: false,
    setEventModal: () => { },
    // dispatchCalEvent: ({ type, payload }) => { },
    // savedEvents: [],
    // selectedEvent: null,
    // setSelectedEvent: () => { },
    // setLabels: () => { },
    // labels: [],
    // updateLabel: () => { },
    // filteredEvents: [],
});

export default CalIndexContext

// GLOBALCONTEXT