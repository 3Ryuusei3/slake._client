import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"

import dashboardServices from "../../services/dashboard.service"
import uploadServices from "../../services/upload.service"

import { AuthContext } from "../../context/auth.context"

const NewHeaderImgForm = ({ setShowImgModal, setHeaderData }) => {
	const { user } = useContext(AuthContext)
	const [headerImg, setHeaderImg] = useState({
		header: {
			image: "",
		},
	})
	const [loadingImage, setLoadingImage] = useState(false)

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append("imageData", e.target.files[0])
		//console.log(formData)

		uploadServices
			.uploadimage(formData)
			.then(res => {
				setHeaderImg({ image: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleImageSubmit = e => {
		e.preventDefault()
		let dashboardId = ""
		dashboardServices
			.getDashboardByUser(user._id)
			.then(res => {
				dashboardId = res.data[0]._id
				return dashboardServices.updateImage(dashboardId, headerImg)
			})
			.then(res => {
				setHeaderImg({ image: res.data.cloudinary_url })
				setShowImgModal(false)
				setHeaderData()
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	return (
		<Form onSubmit={handleImageSubmit}>
			<Form.Group className="mt-2" controlId="image">
				<Form.Control type="file" onChange={handleFileUpload} placeholder="Select an image..." />
			</Form.Group>

			<Button type="submit" className="purple-outline-btn px-5 mt-3" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
				{loadingImage ? "Uploading..." : "Submit"}
			</Button>
		</Form>
	)
}

export default NewHeaderImgForm
