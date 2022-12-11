import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import authService from "../../services/auth.service"
import toast from 'react-hot-toast'

const LoginForm = () => {
	const [signupData, setSignupData] = useState({
		email: "",
		password: "",
	})

	const [errors, setErrors] = useState()

	const { storeToken, authenticateUser, user } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleInputChange = e => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}

	//const notify = () => toast.success(`Welcome back, ${user.username}`)

	const handleFormSubmit = e => {
		e.preventDefault()

		authService
			.login(signupData)
			.then(({ data }) => {
				const tokenFromServer = data.authToken
				storeToken(tokenFromServer)
				authenticateUser()
				//notify()
				navigate("/dashboard")
			})
			.catch(err => setErrors(err.response.data.message))
	}

	const { password, email } = signupData

	return (
		<Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
			<Form.Group className="mb-3" controlId="email">
				<Form.Label className="text-muted">Email</Form.Label>
				<Form.Control type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label className="text-muted">Password</Form.Label>
				<Form.Control type="password" value={password} name="password" onChange={handleInputChange} placeholder="Enter your password..." />
			</Form.Group>

			<p>{errors}</p>

			<Button type="submit" className="purple-outline-btn mt-3 px-5" style={{ maxWidth: "max-content", marginInline: "auto" }}>
				Submit
			</Button>
		</Form>
	)
}

export default LoginForm
