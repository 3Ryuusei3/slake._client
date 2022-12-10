import axios from "axios"

class KanbanService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/kanban`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem("authToken")

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}

			return config
		})
	}

	getKanbanByUser() {
		return this.api.get(`/`)
	}

	updateHeader(id, header) {
		return this.api.put(`/update/header/${id}`, header)
	}
}

const kanbanServices = new KanbanService()

export default kanbanServices
