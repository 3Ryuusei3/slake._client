import axios from "axios"

class AuthService {
	constructor() {
		this.api = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/auth`,
		})

		this.api.interceptors.request.use((config) => {

			const storedToken = localStorage.getItem("authToken");

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

	verify = token => {
		return this.api.get("/verify", { headers: { Authorization: `Bearer ${token}` } })
	}

	refreshToken = refreshedToken => {
		return this.api.get("/refreshtoken", { headers: { Authorization: `Bearer ${refreshedToken}` } })
	}

	deleteUser(userData) {
		return this.api.delete("/delete/:id", userData)
	}


}

const authService = new AuthService()

export default authService
