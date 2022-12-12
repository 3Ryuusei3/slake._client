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
		return this.api.create("/note/new")
	}

	getNotesListByUser(id) {
		return this.api.get(`/list/${id}`)
	}

	/* updateHeader(id, header) {
		return this.api.put(`/update/header/${id}`, header)
	} */
}

const singleNoteService = new SingleNoteService()

export default singleNoteService
