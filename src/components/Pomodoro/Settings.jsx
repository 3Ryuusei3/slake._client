
import { useContext } from "react"
import { SidebarContext } from "../../context/sidebar.context"

import ReactSlider from 'react-slider'
import { PomodoroContext } from "../../context/pomodoro.context"
import BackButton from "./BackButton"

const Settings = () => {

    const { isSidebarOpen } = useContext(SidebarContext)
    const { workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        setShowSettings } = useContext(PomodoroContext)

    return (
        <div className={isSidebarOpen ? "leftPaddingSm rightMargin mt-3" : "leftPaddingLg rightMargin mt-3"}>
            <label>Work: {workMinutes}:00</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={workMinutes}
                onChange={newValue => setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label>Break: {breakMinutes}:00</label>
            <ReactSlider
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={breakMinutes}
                onChange={newValue => setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <BackButton onClick={() => setShowSettings(false)} />
        </div>
    )
}

export default Settings
