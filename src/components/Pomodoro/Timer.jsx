
import { useContext, useState, useEffect, useRef } from "react"
import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import toast from "react-hot-toast"

import PlayButton from "./PlayButton"
import PauseButton from "./PauseButton"
import SettingsButton from "./SettingButton"

import { PomodoroContext } from "../../context/pomodoro.context"

const red = '#f54e4e'
const green = '#4aec8c'

const Timer = () => {

    const { isSidebarOpen } = useContext(SidebarContext)
    const { darkMode } = useContext(DarkModeContext)
    const { setShowSettings, workMinutes, breakMinutes } = useContext(PomodoroContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('work')
    const [secondsLeft, setSecondsLeft] = useState(0)

    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)
    // I have to create REF because SET INTERVAL don`t have SCOPE

    const notifyBreak = () =>
        toast("Breeeeeak", {
            icon: "🎉",
        })

    const notifyWork = () =>
        toast("Wooork!!", {
            icon: "💪🏻",
        })

    const switchMode = () => {

        let nextMode = modeRef.current === 'work' ? 'break' : 'work'
        let nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60

        modeRef.current = nextMode
        setMode(nextMode)

        if (nextMode === 'work') {
            notifyWork()
        } else {
            notifyBreak()
        }

        secondsLeftRef.current = nextSeconds
        setSecondsLeft(nextSeconds)

    }


    useEffect(() => {

        secondsLeftRef.current = workMinutes * 60
        setSecondsLeft(secondsLeftRef.current)


        const tick = () => {

            secondsLeftRef.current--
            setSecondsLeft(secondsLeftRef.current)
        }

        const interval = setInterval(() => {

            if (isPausedRef.current) {
                return
            }
            if (secondsLeftRef.current === 0) {
                return switchMode()
            }
            tick()
        }, 10)

        return () => clearInterval(interval)
    }, [PomodoroContext])

    const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60
    const percentege = Math.round(secondsLeft / totalSeconds * 100)

    const minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    if (seconds < 10) { seconds = '0' + seconds }

    return (
        <div className={!isSidebarOpen ? "leftPaddingSm rightMargin mt-3" : "leftPaddingLg rightMargin mt-3"}>
            <div className={!darkMode ? "Callout" : "Callout-dark"}>
                <h1>Pomodoro</h1>
                <small>Be productive everywhere</small>
                <CircularProgressbar
                    value={percentege}
                    text={minutes + ':' + seconds}
                    styles={buildStyles({
                        textColor: '#fff',
                        pathColor: mode === 'work' ? red : green,
                        tailColor: 'rgba(255, 255, 255, .2)'
                    })} />
                <div>
                    {isPaused ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false }} />
                        : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true }} />}
                </div>
                <div>
                    <SettingsButton onClick={() => setShowSettings(true)} />
                </div>
            </div>
        </div>
    )
}

export default Timer