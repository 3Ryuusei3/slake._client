import { useContext, useState } from "react"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import uploadServices from "../../services/upload.service"
import userService from "../../services/user.service"
import authService from "../../services/auth.service"

import { Modal, Button, Form } from "react-bootstrap"

const ModalProfile = ({ showModal, closeSidebarModal, setShowModal }) => {
	const { user, refreshToken, logoutUser } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)
	const [userData, setUserData] = useState({
		username: user.username,
		email: user.email,
		isDark: user.isDark,
	})

	const [loadingImage, setLoadingImage] = useState(false)
	const [errors, setErrors] = useState()
	const [imgData, setImgData] = useState({
		imageUrl: user.imageUrl,
	})

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append("imageData", e.target.files[0])

		uploadServices
			.uploadSingleFile(formData)
			.then(res => {
				setImgData({ imageUrl: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleInputChange = e => {
		const { value, name } = e.target

		setUserData({ ...userData, [name]: value })
	}

	const handleCheckBox = e => {
		const { checked, name } = e.target

		setUserData({ ...userData, [name]: checked })
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		userService
			.updateUser({ ...userData, imageUrl: imgData.imageUrl })
			.then(() => {
				setUserData({ ...userData, imageUrl: imgData.imageUrl })
				refreshToken()
				setShowModal(false)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const handleDeleteAccount = () => {
		authService
			.deleteUser(user._id)
			.then(() => {
				logoutUser()
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const { username, email, isDark } = userData

	return (
		<>
			<Modal className={darkMode && "modal-dark"} show={showModal} onHide={closeSidebarModal} size={window.innerWidth > 1000 ? "md" : "sm"} aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton onClick={() => setShowModal(false)}>
					<Modal.Title className="px-2 pt-2" id="contained-modal-title-vcenter">
						{`${user.username} Profile`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit} className="px-2">
						<Form.Label className="text-muted">Image</Form.Label>
						<div className="d-flex align-items-center justify-content-between gap-3">
							<img src={user.imageUrl} className="sidebarProfileImg" alt="profile" />
							<Form.Group controlId="image">
								<Form.Control className={darkMode && "form-control-dark"} type="file" onChange={handleFileUpload} placeholder="Select an image..." />
							</Form.Group>
						</div>

						<Form.Group controlId="username">
							<Form.Label className="text-muted">Username</Form.Label>
							<Form.Control className={darkMode && "form-control-dark"} type="text" value={username} name="username" onChange={handleInputChange} placeholder="Enter a username..." />
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label className="text-muted">Email address</Form.Label>
							<Form.Control className={darkMode && "form-control-dark"} type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
						</Form.Group>

						<Form.Group className="mb-3" controlId="theme">
							<Form.Label className="text-muted">Theme</Form.Label>
							<div className="d-flex align-items-center gap-3">
								Dark Mode
								<input type="checkbox" className={!darkMode ? "modalProfileCheckBox" : "modalProfileCheckBox-dark"} name="isDark" onChange={handleCheckBox} checked={isDark ? true : false} />
							</div>
						</Form.Group>
						<Button type="submit" className="purple-outline-btn px-5 mt-5" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
							{loadingImage ? "Uploading..." : "Update profile"}
						</Button>
					</Form>
					<Button type="submit" className="red-outline-btn px-5 mt-4 mb-2" style={{ maxWidth: "max-content", marginInline: "auto" }} onClick={handleDeleteAccount}>
						Delete account
					</Button>
				</Modal.Body>
				{errors && <p className={!darkMode ? "errors-message" : "errors-message-dark"}>{errors}</p>}
			</Modal>
		</>
	)
}

export default ModalProfile
