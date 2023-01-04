
import { useContext, useState, useEffect, useRef } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"
import { PomodoroContext } from "../../context/pomodoro.context"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import toast from "react-hot-toast"

import PlayButton from "./PlayButton"
import PauseButton from "./PauseButton"
import SettingsButton from "./SettingButton"

const gray = '#8f8e8a'
const purple = '#6c63ff'
const lightGray = '#'


const Timer = () => {


    const { darkMode } = useContext(DarkModeContext)
    const { setShowSettings, workMinutes, breakMinutes } = useContext(PomodoroContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('work')
    const [secondsLeft, setSecondsLeft] = useState(0)
    const [showSettingIcon, setShowSettingIcon] = useState(false)

    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)
    // I have to create REF because SET INTERVAL doesn`t have SCOPE

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
        }, 1000)

        return () => clearInterval(interval)
    }, [PomodoroContext])

    const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60
    const percentege = Math.round(secondsLeft / totalSeconds * 100)

    let minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }

    const handleMouseOver = () => {
        setShowSettingIcon(true)
    }

    const handleMouseOut = () => {
        setShowSettingIcon(false)
    }

    return (

        <div className={!darkMode ? "Pomodoro mt-4" : "Pomodoro-dark mt-4"}
            onMouseOver={() => handleMouseOver()}
            onMouseOut={() => handleMouseOut()}>
            <CircularProgressbar
                value={percentege}
                strokeWidth={4}
                text={<tspan dy={0} dx={-19} >{minutes + ':' + seconds}</tspan>}
                styles={buildStyles({
                    textColor: '#fff',
                    pathColor: mode === 'work' ? purple : gray,
                    trailColor: lightGray,
                    strokeLinecap: 'round',
                })
                }
            />

            {isPaused ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false }} />
                : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true }} />}
            {showSettingIcon && (<SettingsButton onClick={() => setShowSettings(true)} />)}
        </div>
    )
}

export default Timer