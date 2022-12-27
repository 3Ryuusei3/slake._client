import axios from 'axios'

class WeatherService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL_WEATHER}/weather`,

        })

        console.log('API URL ________', `${process.env.REACT_APP_API_URL_WEATHER}/weather`)

        console.log('API KEY ----------', `${process.env.REACT_APP_API_KEY_WEATHER}`)

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