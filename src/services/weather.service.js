import axios from 'axios'

class WeatherService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL_WEATHER}/weather`,
        })

        this.key = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/weather/key`
        })

        console.log('API URL ---------', `${process.env.REACT_APP_API_URL_WEATHER}/weather`)


        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getKey() {
        return this.key.get('')
    }


    getWeatherBySearch(searchCity, key) {
        return this.api.get(`?q=${searchCity}&units=metric&APPID=${key}`)
    }

}



const weatherService = new WeatherService()

export default weatherService