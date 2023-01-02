
import { useContext, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { PomodoroContext } from '../../context/pomodoro.context'
import toast from "react-hot-toast"

const CountdownAnimation = ({ key, timer, animate, children }) => {



    const notify = () =>
        toast("Time Out", {
            icon: "⏰",
        })

    return (
        <CountdownCircleTimer
            key={key}
            isPlaying={animate}
            duration={timer * 60}
            colors={['#9b9b9b']}
            strokeWidth={6}
            size={180}
            trailColor="#191919"
            onComplete={() => {
                notify()
                return {
                    shouldRepeat: true, delay: 1000
                }
            }
            }
        >
            {children}
        </CountdownCircleTimer >
    )
}

export default CountdownAnimation

