import { useContext, useEffect } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { PomodoroContext } from "../../context/pomodoro.context"
import { SidebarContext } from "../../context/sidebar.context"

import Button from "./Button"
import CountdownAnimation from "./CountdownAnimation"
import SettingPomodoro from "./SettingPomodoro"

const Pomodoro = () => {

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	const { pomodoro,
		executing,
		setCurrentTimer,
		children,
		startAnimate,
		startTimer,
		pauseTimer,
		updateExecute,
		settingButton } = useContext(PomodoroContext)

	useEffect(() => {
		updateExecute(executing)
	}, [executing, startAnimate])

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm mt-3" : "leftPaddingLg mt-3"}>
			<div className={!darkMode ? "Callout" : "Callout-dark"}>
				<h1>Pomodoro</h1>
				<small>Be productive the right way.</small>
				{pomodoro !== 0 ?
					<>
						<ul>
							<li>
								<Button title="Work"
									activeClass={executing.active === "work" ? "active-label" : undefined}
									_callback={() => setCurrentTimer("work")} />
							</li>
							<li>
								<Button title="Break"
									activeClass={executing.active === "break" ? "active-label" : undefined}
									_callback={() => setCurrentTimer("break")} />
							</li>
						</ul>
						<Button title="Setting" _callback={settingButton} />
						<CountdownAnimation
							timer={pomodoro}
							animate={startAnimate}
						>
							{children}
						</CountdownAnimation>
						<div className="button-wrapper">
							<Button title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
							<Button title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
						</div>
					</> : <SettingPomodoro />}
			</div>
		</div>
	)
}

export default Pomodoro
