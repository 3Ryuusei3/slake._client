import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import { AuthProviderWrapper } from "./context/auth.context"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<AuthProviderWrapper>
			<Router>
				<App />
			</Router>
		</AuthProviderWrapper>
	</React.StrictMode>
)
