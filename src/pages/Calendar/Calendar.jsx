import { useContext } from "react"

import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import CalendarContainer from "../../components/Calendar/CalendarContainer"

import { SidebarContext } from "../../context/sidebar.context"

const Calendar = () => {

    const { isSidebarOpen } = useContext(SidebarContext)

    return (
        <>
            <Sidebar />
            <Header />
            <div className={!isSidebarOpen ? "leftPaddingSm rightMargin pb-5" : "leftPaddingLg rightMargin pb-5"}>
                <CalendarContainer />
            </div>
        </>
    )
}

export default Calendar
