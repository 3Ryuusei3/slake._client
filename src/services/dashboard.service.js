import axios from 'axios'

class DashboardService {
    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/dashboard`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getDashboardByUser(id) {
        return this.api.get(`/${id}`)
    }

    updateImage(id, image) {
        return this.api.put(`/update/image/${id}`, image)
    }
}

const dashboardServices = new DashboardService()

export default dashboardServices