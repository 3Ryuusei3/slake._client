import React, { useState } from "react";
import CalIndexContext from "./calindex.context";
import dayjs from "dayjs";

const CalendarWrapper = (props) => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())



    return (
        <CalIndexContext.Provider value={{ monthIndex, setMonthIndex }}>
            {props.children}
        </CalIndexContext.Provider>
    )
}

export default CalendarWrapper