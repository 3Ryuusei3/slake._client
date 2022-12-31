
import { useContext } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { PomodoroContext } from '../../context/pomodoro.context'

const CountdownAnimation = ({ key = 1, timer = 1, animate = true, children }) => {

    const { stopTimer } = useContext(PomodoroContext)

    return (
        <CountdownCircleTimer
            key={key}
            isPlaying={animate}
            duration={timer * 60}
            colors={['#9b9b9b', 0.33]}
            strokeWidth={6}
            trailColor="#191919"
            onComplete={() => {
                stopTimer()
            }}
        >
            {children}
        </CountdownCircleTimer>
    )
}

export default CountdownAnimation

