import axios from "axios"

class SingleNoteService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/note`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem("authToken")

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}

			return config
		})
	}

	createNewNote() {
		return this.api.post("/new")
	}

	getNotesListByUser(id) {
		return this.api.get(`/list/${id}`)
	}

	getNoteByNoteId(id) {
		return this.api.get(`/${id}`)
	}

	updateHeader(id, header) {
		return this.api.put(`/update/header/${id}`, header)
	}

	updateBlocks(id, blocks) {
		return this.api.put(`/update/blocks/${id}`, blocks)
	}

	deleteNoteByNoteId(id) {
		return this.api.delete(`/delete/${id}`)
	}
}

const singleNoteService = new SingleNoteService()

export default singleNoteService
