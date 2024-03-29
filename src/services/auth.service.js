import axios from "axios"

class AuthService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/auth`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem("authToken")

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}

			return config
		})
	}

	signup(userData) {
		return this.api.post("/signup", userData)
	}

	login(userData) {
		return this.api.post("/login", userData)
	}

	getUserName(userData) {
		return this.api.get('/getusername', userData).then(({ data }) => data)
	}

	verify = token => {
		return this.api.get("/verify", { headers: { Authorization: `Bearer ${token}` } })
	}

	refreshToken = refreshedToken => {
		return this.api.get("/refreshtoken", { headers: { Authorization: `Bearer ${refreshedToken}` } })
	}

	deleteUser(id) {
		return this.api.delete(`/delete/${id}`)
	}
}

const authServices = new AuthService()

export default authServices
