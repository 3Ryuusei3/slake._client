import { useContext, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

import uploadServices from "../../services/upload.service"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import toast from "react-hot-toast"

const ModalProfile = ({ showModal, closeSidebarModal, setShowModal }) => {
	const { user } = useContext(AuthContext)

	const [userData, setUserData] = useState({
		username: user.username,
		email: user.email,
	})

	const [loadingImage, setLoadingImage] = useState(false)
	const [errors, setErrors] = useState("")
	const [imgData, setImgData] = useState({
		imageUrl: user.imageUrl,
	})

	const notify = () => toast.success(`Thanks for change your profile, ${user.username}`)

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

	const handleFormSubmit = e => {
		e.preventDefault()

		userService
			.updateUser({ ...userData, imageUrl: imgData.imageUrl })
			.then(() => {
				setUserData({ ...userData, imageUrl: imgData.imageUrl })
				setShowModal(false)
				notify()
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const { username, email } = userData

	return (
		<>
			<Modal show={showModal} onHide={closeSidebarModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header className="profileHeader" closeButton onClick={() => setShowModal(false)}>
					<Modal.Title className="px-2" id="contained-modal-title-vcenter">
						{`${user.username} Profile`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit} className="px-2">
						<Form.Label className="text-muted">Image</Form.Label>
						<div className="d-flex align-items-center justify-content-between mb-4">
							<img src={user.imageUrl} className="sidebarProfileImg" />
							<Form.Group className="mt-2" controlId="image">
								<Form.Control type="file" onChange={handleFileUpload} placeholder="Select an image..." />
							</Form.Group>
						</div>
						{/* ASOCIAR LA IMAGEN DEL USUARIO AL FORM DE CAMBIO  */}
						<Form.Group className="mb-3" controlId="username">
							<Form.Label className="text-muted">Username</Form.Label>
							<Form.Control type="text" value={username} name="username" onChange={handleInputChange} placeholder="Enter a username..." />
						</Form.Group>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label className="text-muted">Email address</Form.Label>
							<Form.Control type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
						</Form.Group>
						<Button type="submit" className="purple-outline-btn px-5 mt-4" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
							{loadingImage ? "Uploading..." : "Update profile"}
						</Button>
						{/* FALTA HACER MODAL DE CONFIRMACIÓN Y SUBMIT DE BORRAR CUENTA */}
						<Button type="submit" className="red-outline-btn px-5 mt-4 mb-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
							Delete account
						</Button>
					</Form>
				</Modal.Body>
				<p>{errors}</p>
			</Modal>
		</>
	)
}

export default ModalProfile
