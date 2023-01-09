import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import { AuthProviderWrapper } from "./context/auth.context"
import { SidebarProviderWrapper } from "./context/sidebar.context"
import { DarkModeProviderWrapper } from "./context/darkmode.context"
import { PomodoroProviderWrapper } from "./context/pomodoro.context"
import CalendarWrapper from "./context/calendar.context"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<AuthProviderWrapper>
		<DarkModeProviderWrapper>
			<SidebarProviderWrapper>
				<CalendarWrapper>
					<PomodoroProviderWrapper>
						<Router>
							<App />
						</Router>
					</PomodoroProviderWrapper>
				</CalendarWrapper>
			</SidebarProviderWrapper>
		</DarkModeProviderWrapper>
	</AuthProviderWrapper>
)
