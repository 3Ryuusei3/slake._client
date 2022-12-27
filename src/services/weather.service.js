import axios from 'axios'

class WeatherService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL_WEATHER}/weather`,

        })

        console.log(`${process.env.REACT_APP_API_URL_WEATHER}/weather?q=madrid&units=metric&APPID=${process.env.REACT_APP_APPID}`)

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }


    getWeatherBySearch(searchCity) {
        return this.api.get(`?q=${searchCity}&units=metric&APPID=${process.env.REACT_APP_API_KEY_WEATHER}`)
    }

}



const weatherService = new WeatherService()

export default weatherService