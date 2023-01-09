import dayjs from "dayjs"
import { useContext } from "react"
import CalIndexContext from "../../context/calindex.context"

const CalendarMenu = () => {

    const { monthIndex, setMonthIndex } = useContext(CalIndexContext)



    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1)
    }

    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1)
    }

    return (
        <div>
            <button>
                Today
            </button>
            <button onClick={() => handlePrevMonth()}><i className="bi bi-chevron-left"></i></button>
            <button onClick={() => handleNextMonth()}><i className="bi bi-chevron-right"></i></button>
            <h3>
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h3>
        </div>
    )
}

export default CalendarMenu