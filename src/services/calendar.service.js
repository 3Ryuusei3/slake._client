import axios from "axios"

class CalendarService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/calendar`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem("authToken")

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}

			return config
		})
	}

	getCalendarByUser() {
		return this.api.get(`/`)
	}

	updateHeader(id, header) {
		return this.api.put(`/update/header/${id}`, header)
	}

	/* updateKanban(id, lanes) {
		return this.api.put(`/update/${id}`, lanes)
	} */
}

const calendarServices = new CalendarService()

export default calendarServices
