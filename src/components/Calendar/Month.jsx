import dayjs from "dayjs"

const Month = ({ currentMonth }) => {

    return (
        <div className="month">
            {currentMonth.map((row, idx) => {
                return (
                    <div key={idx}>
                        {row.map((day, idx) => {
                            const getCurrentDayClass = () => {
                                return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-primary text-white" : ""
                            }

                            return (
                                <div className="border border-dark border-2" key={idx}>
                                    <p>{day.format("ddd").toUpperCase()}</p>
                                    <p className={`${getCurrentDayClass()}`}>{day.format("DD")} </p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div >
    )
}

export default Month