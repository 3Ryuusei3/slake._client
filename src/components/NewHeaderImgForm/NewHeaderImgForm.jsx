import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import uploadServices from "../../services/upload.service"

const NewHeaderImgForm = () => {
	const [headerImg, setHeaderImg] = useState({
		header: {
			image: "",
		},
	})

	const handleFileUpload = e => {
		const formData = new FormData()
		formData.append("imageData", e.target.files[0])

		uploadServices
			.uploadimage(formData)
			.then(res => {
				setHeaderImg({ image: res.data.cloudinary_url })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		// JUN
	}

	return (
		<Form onSubmit={handleFormSubmit}>
			<Form.Group className="mt-2" controlId="image">
				<Form.Control type="file" onChange={handleFileUpload} placeholder="Select an image..." />
			</Form.Group>

			<Button type="submit" className="red-outline-btn px-5 mt-3" style={{ maxWidth: "max-content", marginInline: "auto" }}>
				Submit
			</Button>
		</Form>
	)
}

export default NewHeaderImgForm
