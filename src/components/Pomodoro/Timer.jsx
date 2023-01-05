import { useContext, useState, useEffect, useRef } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { PomodoroContext } from "../../context/pomodoro.context"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import toast from "react-hot-toast"

const Timer = () => {
    const { darkMode } = useContext(DarkModeContext)
    const { setShowSettings, workMinutes, breakMinutes } = useContext(PomodoroContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState("work")
    const [secondsLeft, setSecondsLeft] = useState(0)
    const [showSettingIcon, setShowSettingIcon] = useState(false)

    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode) // Using useRef as setInterval() doesn`t have scope

    const notifyBreak = () =>
        toast("Breeeeeak", {
            icon: "🎉",
        })

    const notifyWork = () =>
        toast("Wooork!!", {
            icon: "💪🏻",
        })

    const switchMode = () => {
        let nextMode = modeRef.current === "work" ? "break" : "work"
        let nextSeconds = (nextMode === "work" ? workMinutes : breakMinutes) * 60

        modeRef.current = nextMode
        setMode(nextMode)

        if (nextMode === "work") {
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

    const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60
    const percentege = Math.round((secondsLeft / totalSeconds) * 100)

    let minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }

    const handleMouseOver = () => {
        setShowSettingIcon(true)
    }

    const handleMouseOut = () => {
        setShowSettingIcon(false)
    }

    return (
        <div className={!darkMode ? "Pomodoro mt-4" : "Pomodoro-dark mt-4"} onMouseOver={() => handleMouseOver()} onMouseOut={() => handleMouseOut()}>
            <CircularProgressbar
                value={percentege}
                strokeWidth={4}
                styles={buildStyles({
                    textColor: darkMode ? "var(--dark-text-primary)" : "var(--text-primary)",
                    pathColor: mode === "work" ? "var(--color-primary)" : "var(--text-secondary)",
                    trailColor: darkMode ? "var(--bg-modal)" : "var(--text-terciary)",
                    strokeLinecap: "round",
                })}
            />
            <p>{minutes + ":" + seconds}</p>

            {isPaused ? (
                <button
                    onClick={() => {
                        setIsPaused(false)
                        isPausedRef.current = false
                    }}
                    className={!darkMode ? "pomodoroBtn" : "pomodoroBtn-dark"}
                >
                    <i className="bi bi-play"></i>
                </button>
            ) : (
                <button
                    onClick={() => {
                        setIsPaused(true)
                        isPausedRef.current = true
                    }}
                    className={!darkMode ? "pomodoroBtn" : "pomodoroBtn-dark"}
                >
                    <i className="bi bi-pause"></i>
                </button>
            )}
            {showSettingIcon && (
                <button onClick={() => setShowSettings(true)} className={!darkMode ? "pomodoroBtn settingsBtn" : "pomodoroBtn-dark settingsBtn-dark"}>
                    <i className="bi bi-gear"></i>
                </button>
            )}
        </div>
    )
}

export default Timer
