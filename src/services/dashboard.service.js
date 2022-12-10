import axios from "axios"

class DashboardService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/dashboard`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem("authToken")

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}

			return config
		})
	}

	getDashboardByUser() {
		return this.api.get("/")
	}

	updateHeader(id, header) {
		return this.api.put(`/update/header/${id}`, header)
	}

	updateCallout(id, callout) {
		return this.api.put(`/update/callout/${id}`, callout)
	}

	updateTodo(id, todo) {
		return this.api.put(`/update/todo/${id}`, todo)
	}

}

const dashboardServices = new DashboardService()

export default dashboardServices
