import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


import { AuthProviderWrapper } from "./context/auth.context"
import { SidebarProviderWrapper } from "./context/sidebar.context"
import { DarkModeProviderWrapper } from "./context/darkmode.context"



const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<DarkModeProviderWrapper>
		<AuthProviderWrapper>
			<SidebarProviderWrapper>
				<Router>
					<App />
				</Router>
			</SidebarProviderWrapper>
		</AuthProviderWrapper>
	</DarkModeProviderWrapper>
)
