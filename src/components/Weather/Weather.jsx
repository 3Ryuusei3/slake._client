import { useEffect, useState } from "react"

import weatherService from "../../services/weather.service"


function Weather() {

    const [weatherData, setWeatherData] = useState()
    const [searchCity, setSearchCity] = useState('madrid')


    const getWeatherData = () => {
        weatherService
            .getWeatherBySearch(searchCity)
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log({ message: 'Internal Server Error', err }))
    }

    useEffect(() => {
        getWeatherData()
    }, [])

    return (
        <>
            <h1>WEATHER</h1>
            <p></p>

        </>
    )
}

export default Weather