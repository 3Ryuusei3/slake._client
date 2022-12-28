import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"




function Pomodoro() {

    const { isSidebarOpen } = useContext(SidebarContext)
    const { darkMode } = useContext(DarkModeContext)

    return (
        <div className={!isSidebarOpen ? "leftPaddingSm mt-3" : "leftPaddingLg mt-3"}>
            <div className={!darkMode ? "Callout" : "Callout-dark"}>
                <h1>Pomodoro</h1>
                <small>Be productive the right way.</small>
            </div>
        </div>
    )
}

export default Pomodoro