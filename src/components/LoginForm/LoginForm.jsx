import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import authService from "../../services/auth.service"

const LoginForm = () => {
	const [signupData, setSignupData] = useState({
		email: "",
		password: "",
	})

	const handleInputChange = e => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}

	const navigate = useNavigate()
	const { storeToken, authenticateUser } = useContext(AuthContext)

	const handleSubmit = e => {
		e.preventDefault()

		authService
			.login(signupData)
			.then(({ data }) => {
				const tokenFromServer = data.authToken
				storeToken(tokenFromServer)
				authenticateUser()
				navigate("/dashboard")
			})
			.catch(err => console.log(err))
	}

	const { password, email } = signupData

	return (
		<Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="email">
				<Form.Label className="text-muted">Email</Form.Label>
				<Form.Control type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label className="text-muted">Password</Form.Label>
				<Form.Control type="password" value={password} name="password" onChange={handleInputChange} placeholder="Enter your password..." />
			</Form.Group>

			<Button type="submit" className="red-outline-btn mt-3 px-5" style={{ maxWidth: "max-content", marginInline: "auto" }}>
				Submit
			</Button>
		</Form>
	)
}

export default LoginForm
