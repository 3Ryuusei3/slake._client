import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.service"
import toast from "react-hot-toast"

const AuthContext = createContext()

const AuthProviderWrapper = props => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)


	// const notifyLogIn = () =>
	// 	toast('Welcome back', {
	// 		icon: "🎉",
	// 	})

	const notifyLogOut = () =>
		toast("See you soon", {
			icon: "👋🏼",
		})

	const storeToken = token => {
		localStorage.setItem("authToken", token)
	}

	const authenticateUser = () => {
		const token = localStorage.getItem("authToken")

		if (token) {
			setIsLoading(true)
			authService
				.verify(token)
				.then(({ data }) => {
					setUser(data)
					setIsLoading(false)
				})
				.catch(err => {
					console.error("Internal Server Error", err)
					setIsLoading(false)
				})
		}
	}


	const logoutUser = () => {
		setUser(null)
		setIsLoading(false)
		notifyLogOut()
		localStorage.removeItem("authToken")
	}

	const refreshToken = () => {
		authService.refreshToken().then(({ data }) => {
			const newToken = data.refreshedToken
			storeToken(newToken)
			authenticateUser()
		})
	}

	useEffect(() => {
		authenticateUser()
	}, [])

	return <AuthContext.Provider value={{ storeToken, refreshToken, authenticateUser, user, logoutUser, isLoading }}>{props.children}</AuthContext.Provider>
}

export { AuthContext, AuthProviderWrapper }
