import { useContext, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

import uploadServices from "../../services/upload.service"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"


const ModalProfile = ({ showModal, closeSidebarModal, setShowModal, getDashboardData }) => {

    const { user } = useContext(AuthContext)

    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email
    })


    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState('')
    const [imgData, setImgData] = useState({
        image: user.imageUrl
    })


    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append("imageData", e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setImgData({ image: res.data.cloudinary_url })
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

        console.log({ ...userData, image: imgData.image })

        userService
            .updateUser({ ...userData, image: imgData.image })
            .then(() => {
                console.log('hola')
                setUserData({ ...userData, image: imgData.image })
                setShowModal(false)
                getDashboardData()
            })
            .catch(err => setErrors(err.response.data.message))
    }

    const { username, email } = userData

    return (
        <>
            <Modal show={showModal} onHide={closeSidebarModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={() => setShowModal(false)}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mt-2" controlId="image">
                            <Form.Control type="file" onChange={handleFileUpload} placeholder="Select an image..." />
                        </Form.Group>
                        <img src={user.imageUrl} className="sidebarProfileImg" />
                        {/* ASOCIAR LA IMAGEN DEL USUARIO AL FORM DE CAMBIO  */}
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="text-muted">Username</Form.Label>
                            <Form.Control type="text" value={username} name="username" onChange={handleInputChange} placeholder="Enter a username..." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="text-muted">Email address</Form.Label>
                            <Form.Control type="email" value={email} name="email" onChange={handleInputChange} placeholder="Enter your email address..." />
                        </Form.Group>
                        <Button type="submit" className="red-outline-btn px-5 mt-3" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
                            {loadingImage ? 'Uploading...' : 'Send'}
                        </Button>
                        <Button type="submit" className="red-outline-btn px-5 mt-3" style={{ maxWidth: "max-content", marginInline: "auto" }}  >
                            Delete
                        </Button>
                    </Form>
                </Modal.Body>
                <p>{errors}</p>
            </Modal>
        </>
    )

}

export default ModalProfile