import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"

import dashboardServices from "../../services/dashboard.service"
import uploadServices from "../../services/upload.service"

import { AuthContext } from "../../context/auth.context"



const NewHeaderImgForm = () => {
	/* const { user } = useContext(AuthContext) */ // Temporal

	const [headerImg, setHeaderImg] = useState({
		header: {
			image: "",
		},
	})

	const dashboard_id = "6390d3aecca812f121b0da08" //Temporal

	const handleFileUpload = e => {
		const formData = new FormData()
		formData.append("imageData", e.target.files[0])
		console.log(formData)

		uploadServices
			.uploadimage(formData)
			.then(res => {
				setHeaderImg({ image: res.data.cloudinary_url })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleImageSubmit = e => {
		e.preventDefault()

		dashboardServices
			.updateImage(dashboard_id, headerImg)
			.then(res => {
				setHeaderImg({ image: res.data.cloudinary_url })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))


		// JUN
	}

	return (
		<Form onSubmit={handleImageSubmit}>
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
