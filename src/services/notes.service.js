import axios from "axios"

class NotesService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/notes`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem("authToken")

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}

			return config
		})
	}

	getNotesByUser() {
		return this.api.get(`/`)
	}

	updateImage(id, image) {
		return this.api.put(`/update/image/${id}`, image)
	}
}

const notesServices = new NotesService()

export default notesServices
