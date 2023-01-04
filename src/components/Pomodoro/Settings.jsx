
import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"
import { PomodoroContext } from "../../context/pomodoro.context"

import ReactSlider from 'react-slider'

import BackButton from "./BackButton"

const Settings = () => {

    const { isSidebarOpen } = useContext(SidebarContext)
    const { workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        setShowSettings } = useContext(PomodoroContext)
    const { darkMode } = useContext(DarkModeContext)

    return (
        <div className={!darkMode ? "PomodoroSettings mt-4" : "PomodoroSettings-dark mt-4"}>
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
                className={'slider-gray'}
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
