import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { PomodoroContext } from "../../context/pomodoro.context"
import { SidebarContext } from "../../context/sidebar.context"
import Button from "./Button"

import CountdownAnimation from "./CountdownAnimation"
import SetPomodoro from "./setPomodoro"

const Pomodoro = () => {
	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)
	const { pomodoro, executing, setCurrentTimer } = useContext(PomodoroContext)

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm mt-3" : "leftPaddingLg mt-3"}>
			<div className={!darkMode ? "Callout" : "Callout-dark"}>
				<h1>Pomodoro</h1>
				<small>Be productive the right way.</small>
				{pomodoro !== 0 ? (
					<SetPomodoro />
				) : (
					<>
						<ul>
							<li>
								<Button tittle="Work" activeclassName={executing.active === "work" && "active-label"} _callback={() => setCurrentTimer("work")} />
							</li>
							<li>
								<Button tittle="Short Break" activeclassName={executing.active === "shortBreak" && "active-label"} _callback={() => setCurrentTimer("shortBreak")} />
							</li>
							<li>
								<Button tittle="Long Break" activeclassName={executing.active === "longBreak" && "active-label"} _callback={() => setCurrentTimer("longBreak")} />
							</li>
						</ul>
					</>
				)}
				<CountdownAnimation />
			</div>
		</div>
	)
}

export default Pomodoro
