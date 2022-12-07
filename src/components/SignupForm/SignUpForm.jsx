import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import authService from "../../services/auth.service"
import uploadServices from "../../services/upload.service" //QUITAR S

const SignUpForm = () => {
	const [signupData, setSignupData] = useState({
		email: "",
		username: "",
		password: "",
		imageUrl: "",
	})

	const [loadingImage, setLoadingImage] = useState(false)
	const [errors, setErrors] = useState('')

	const handleInputChange = e => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}

	const handleFileUpload = e => {

		setLoadingImage(true)

		const formData = new FormData()
		formData.append("imageData", e.target.files[0])

		uploadServices
			.uploadimage(formData)
			.then(res => {
				setSignupData({ ...signupData, imageUrl: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => console.log('Internal server error', err))
	}

	const navigate = useNavigate()

	const handleFormSubmit = e => {
		e.preventDefault()

		authService
			.signup(signupData)
			.then(() => {
				console.log(signupData)
				navigate("/login")
			})
			.catch(err => setErrors(err.response.data.message))
	}

	const { email, username, password } = signupData

	return (
		<Form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label className="text-muted">Username</Form.Label>
				<Form.Control type="text" value={username} name="username" onChange={handleInputChange} placeholder="Enter a username..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label className="text-muted">Password</Form.Label>
				<Form.Control type="password" value={password} name="password" onChange={handleInputChange} placeholder="Enter your password..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="email">
				<Form.Label className="text-muted">Email address</Form.Label>
				<Form.Control type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="image">
				<Form.Label className="text-muted">Image</Form.Label>
				<Form.Control type="file" onChange={handleFileUpload} placeholder="Select an image..." />
			</Form.Group>

			{<p>{errors}</p>}

			<Button type="submit" className="red-outline-btn mt-3 px-5" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
				{loadingImage ? 'Uploading...' : 'Submit'}
			</Button>
		</Form>
	)
}

export default SignUpForm
