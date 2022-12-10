import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"

import dashboardServices from "../../services/dashboard.service"
import kanbanServices from "../../services/kanban.service"
import notesServices from "../../services/notes.service"
import uploadServices from "../../services/upload.service"

import { AuthContext } from "../../context/auth.context"

import { Form, Button } from "react-bootstrap"

const NewHeaderImgForm = ({ setShowImgModal, setHeaderData }) => {
	const { user } = useContext(AuthContext)
	const [headerImg, setHeaderImg] = useState({
		header: {
			image: "",
		},
	})
	const [loadingImage, setLoadingImage] = useState(false)

	let location = useLocation()
	let pageLocation = location.pathname.substring(1)

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append("imageData", e.target.files[0])

		uploadServices
			.uploadSingleFile(formData)
			.then(res => {
				setHeaderImg({ image: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleImageSubmit = e => {
		e.preventDefault()

		if (pageLocation === "dashboard") {
			dashboardServices
				.getDashboardByUser(user._id)
				.then(res => {
					return dashboardServices.updateHeader(res.data[0]._id, headerImg)
				})
				.then(res => {
					setHeaderImg({ image: res.data.cloudinary_url })
					setHeaderData()
					setShowImgModal(false)
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "kanban") {
			kanbanServices
				.getKanbanByUser(user._id)
				.then(res => {
					return kanbanServices.updateImage(res.data[0]._id, headerImg)
				})
				.then(res => {
					setHeaderImg({ image: res.data.cloudinary_url })
					setShowImgModal(false)
					setHeaderData()
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		} else if (pageLocation === "notes") {
			notesServices
				.getNotesByUser(user._id)
				.then(res => {
					return notesServices.updateImage(res.data[0]._id, headerImg)
				})
				.then(res => {
					setHeaderImg({ image: res.data.cloudinary_url })
					setShowImgModal(false)
					setHeaderData()
				})
				.catch(err => console.log({ message: "Internal server error:", err }))
		}
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
