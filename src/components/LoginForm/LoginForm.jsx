import { useState, useContext, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"
import toast from "react-hot-toast"




import authService from "../../services/auth.service"



const LoginForm = () => {
	const [signupData, setSignupData] = useState({
		email: "",
		password: "",

	})
	const [errors, setErrors] = useState()

	const { darkMode } = useContext(DarkModeContext)
	const { storeToken, authenticateUser } = useContext(AuthContext)



	const notifyLogIn = () =>
		toast('Welcome back', {
			icon: "🎉",
		})

	const navigate = useNavigate()

	const handleInputChange = e => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}


	const handleFormSubmit = e => {
		e.preventDefault()

		authService
			.login(signupData)
			.then(({ data }) => {
				const tokenFromServer = data.authToken
				storeToken(tokenFromServer)
				authenticateUser()
				navigate("/dashboard")
				notifyLogIn()
			})
			.catch(err => setErrors(err.response.data.message))
	}


	const { password, email } = signupData

	return (
		<Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
			<Form.Group className="mb-3" controlId="email">
				<Form.Label className="text-muted">Email</Form.Label>
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label className="text-muted">Password</Form.Label>
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="password" value={password} name="password" onChange={handleInputChange} placeholder="Enter your password..." />
			</Form.Group>

			<p>{errors}</p>

			<Button type="submit" className="purple-outline-btn mt-3 px-5" style={{ maxWidth: "max-content", marginInline: "auto" }}>
				Submit
			</Button>
		</Form>
	)
}

export default LoginForm



// authService
// 	.login(signupData)
// 	.then(res => {
	// 		console.log(signupData.email)
	// 		username = authService.getUserName(signupData.email)
	// 		console.log(username)
	// 		return res
	// 	})
	// 	.then(({ data }) => {
		// 		const tokenFromServer = data.authToken
		// 		storeToken(tokenFromServer)
		// 		authenticateUser()
		// 		navigate("/dashboard")
		// 		notifyLogIn(username)
		// 	})
		// 	.catch(err => setErrors(err.response.data.message))
		// const notifyLogIn = (user) =>
		// 	toast(`Welcome back, ${user}`, {
		// 		icon: "🎉",
		// 	})


		// const handleFormSubmit = e => {
		// 	e.preventDefault()

		// 	let username

		// 	authService
		// 		.getUserName("a@a.com")
		// 		.then((res) => {
		// 			console.log(signupData)
		// 			console.log(res)
		// 			username = res
		// 			/* return authService.login(signupData) */
		// 		})
		// 		/* .then(({ data }) => {
		// 			const tokenFromServer = data.authToken
		// 			storeToken(tokenFromServer)
		// 			authenticateUser()
		// 			navigate("/dashboard")
		// 			notifyLogIn(username)
		// 		}) */
		// 		.catch(err => setErrors(err.response.data.message))
		// }






		// const handleFormSubmit2 = e => {
			// 	e.preventDefault()

			// 	authService
		// 		.login(signupData)
		// 		.findOne({ email: })
		// 		.then(())
		// }