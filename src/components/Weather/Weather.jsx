import { useEffect, useState } from "react"

import weatherService from "../../services/weather.service"

const Weather = () => {
	const [weatherData, setWeatherData] = useState()
	const [searchCity, setSearchCity] = useState("madrid")

	const getWeatherData = () => {
		weatherService
			.getKey()
			.then(res => {
				console.log(res.data)
				return weatherService.getWeatherBySearch(searchCity, res.data)
			})
			.catch(err => console.log({ message: "Internal Server Error", err }))
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
