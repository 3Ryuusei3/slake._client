import { createContext, useContext, useState } from "react"
import SetPomodoro from "../components/Pomodoro/setPomodoro"

const PomodoroContext = createContext()

const PomodoroProviderWrapper = props => {
	const [pomodoro, setPomodoro] = useState(0)
	const [executing, setExecuting] = useState({})
	const [startAnimate, setStartAnimate] = useState(false)

	const startTimer = () => {
		setStartAnimate(true)
	}

	const pauseTimer = () => {
		setStartAnimate(false)
	}

	const stopTimer = () => {
		setStartAnimate(false)
	}

	const settingButton = () => {
		setExecuting({})
		setPomodoro(0)
	}

	const setCurrentTimer = active_state => {
		updateExecute({
			...executing,
			active: active_state,
		})
		setTimerTime(executing)
	}

	const updateExecute = updatedSettings => {
		setExecuting(updatedSettings)
		setTimerTime(updatedSettings)
	}

	const setTimerTime = evaluate => {
		switch (evaluate.active) {
			case "work":
				SetPomodoro(evaluate.work)
				break
			case "shortBreak":
				setPomodoro(evaluate.short)
				break
			case "longBreak":
				setPomodoro(evaluate.long)
				break
			default:
				setPomodoro(0)
				break
		}
	}

	const children = ({ remainingTimer }) => {
		const minutes = Math.floor(remainingTimer / 60)
		const seconds = remainingTimer % 60

		return `${minutes} : ${seconds}`
	}

	return (
		<PomodoroContext.Provider
			value={{
				startTimer,
				pauseTimer,
				stopTimer,
				updateExecute,
				pomodoro,
				executing,
				startAnimate,
				settingButton,
				setCurrentTimer,
				children,
			}}
		>
			{props.children}
		</PomodoroContext.Provider>
	)
}

export { PomodoroProviderWrapper, PomodoroContext }
