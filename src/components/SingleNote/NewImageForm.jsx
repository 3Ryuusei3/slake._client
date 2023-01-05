import { useState, useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import uploadServices from "../../services/upload.service"

import { Form, Button } from "react-bootstrap"

const NewBlockImageForm = ({ setShowImgModal, changeImgUrl, /* blockId, */ clikedBlockId }) => {
	const { darkMode } = useContext(DarkModeContext)

	const [blockImg, setBlockImg] = useState("")
	const [loadingImage, setLoadingImage] = useState(false)

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append("imageData", e.target.files[0])

		uploadServices
			.uploadSingleFile(formData)
			.then(res => {
				setBlockImg(res.data.cloudinary_url)
				setLoadingImage(false)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleImageSubmit = e => {
		e.preventDefault()
		changeImgUrl(clikedBlockId, blockImg)
		setShowImgModal(false)
	}

	return (
		<Form onSubmit={handleImageSubmit}>
			<Form.Group className="mt-2" controlId="image">
				<Form.Control className={!darkMode ? "form-control" : "form-control-dark"} type="file" onChange={handleFileUpload} placeholder="Select an image..." />
			</Form.Group>

			<Button type="submit" className="purple-outline-btn px-5 mt-3" style={{ maxWidth: "max-content", marginInline: "auto" }} disabled={loadingImage}>
				{loadingImage ? "Uploading..." : "Submit"}
			</Button>
		</Form>
	)
}

export default NewBlockImageForm
