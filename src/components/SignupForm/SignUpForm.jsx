import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { DarkModeContext } from "../../context/darkmode.context"

import authService from "../../services/auth.service"
import uploadServices from "../../services/upload.service" //QUITAR S

import { Form, Button } from "react-bootstrap"

const SignUpForm = () => {
	const [signupData, setSignupData] = useState({
		email: "",
		username: "",
		password: "",
		imageUrl: "",
	})

	const { darkMode } = useContext(DarkModeContext)

	const [loadingImage, setLoadingImage] = useState(false)
	const [errors, setErrors] = useState([])

	const notify = () =>
		toast("Success Sign Up", {
			icon: "💜",
		})

	const handleInputChange = e => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append("imageData", e.target.files[0])

		uploadServices
			.uploadSingleFile(formData)
			.then(res => {
				setSignupData({ ...signupData, imageUrl: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => console.log("Internal server error", err))
	}

	const navigate = useNavigate()

	const handleFormSubmit = e => {
		e.preventDefault()

		authService
			.signup(signupData)
			.then(() => {
				notify()
				navigate("/login")
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const { email, username, password } = signupData

	return (
		<Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label className="text-muted">Username</Form.Label>
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="text" value={username} name="username" onChange={handleInputChange} placeholder="Enter a username..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label className="text-muted">Password</Form.Label>
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="password" value={password} name="password" onChange={handleInputChange} placeholder="Enter your password..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="email">
				<Form.Label className="text-muted">Email address</Form.Label>
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="image">
				<Form.Label className="text-muted">Image</Form.Label>
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="file" onChange={handleFileUpload} placeholder="Select an image..." />
			</Form.Group>

			{errors.length ? (
				<p>
					{errors.map(elm => (
						<p key={elm}>{elm}</p>
					))}
				</p>
			) : undefined}

			<Button type="submit" className="purple-outline-btn mt-3 px-5" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
				{loadingImage ? "Uploading..." : "Submit"}
			</Button>
		</Form>
	)
}

export default SignUpForm
