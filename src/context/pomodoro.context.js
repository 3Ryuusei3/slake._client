import { createContext, useState } from "react"

const PomodoroContext = createContext()

const PomodoroProviderWrapper = props => {
	const [showSettings, setShowSettings] = useState(false)
	const [workMinutes, setWorkMinutes] = useState(45)
	const [breakMinutes, setBreakMinutes] = useState(15)

	return (
		<PomodoroContext.Provider
			value={{
				showSettings,
				setShowSettings,
				workMinutes,
				setWorkMinutes,
				breakMinutes,
				setBreakMinutes,
			}}
		>
			{props.children}
		</PomodoroContext.Provider>
	)
}

export { PomodoroProviderWrapper, PomodoroContext }
