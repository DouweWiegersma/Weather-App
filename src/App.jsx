import SearchBar from "./Components/SearchBar.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import WeatherAtm from "./Components/WeatherAtm.jsx";
import PerceivedClimate from "./Components/Perceivedclimate.jsx";
import DailyForecast from "./Components/DailyForecast.jsx";
import UnitBar from "./Components/UnitBar.jsx";
import HourlyForecast from "./Components/HourlyForecast.jsx";



function App() {

const [location, setLocation] = useState(null)
const [currentWeather, setCurrentWeather] = useState(null)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)

async function handleSubmit(cityName) {
    setLoading(true)
    setError(null)
    try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: {
                name: cityName,
            }
        })
        setLocation(response.data.results[0])
        console.log(response.data.results[0])
    } catch (e) {
        console.error(e, 'Failed to get data!')
        setError('Cant find any data')
        setLoading(false)
    }
}


useEffect(() => {

    if (!location) return;
    async function current() {
        setLoading(true)
        try {
            const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    minutely_15: "temperature_2m,relative_humidity_2m,apparent_temperature",
                    hourly: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "weather_code"],
                    current_weather: true,
                    wind_speed_unit: "kmh",
                    timezone: "auto",
                    daily: ['temperature_2m_mean', 'apparent_temperature_mean', 'weather_code', 'apparent_temperature_min', 'apparent_temperature_max', 'precipitation_sum']
                }
            })
            console.log(response.data)
            setCurrentWeather(response.data)
        } catch (e) {
            console.error(e, 'Failed to get data')
            setError('cant find any data!')
        }
        finally {
            setLoading(false)
        }
    }
    current()
}, [location])
    if (loading === true) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-950">
                <p className="text-blue-300 text-2xl animate-pulse">Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-950 text-2xl animate-pulse">{error}</p>
            </div>
        );
    }
    return (
        <div className='bg-blue-950 w-screen min-h-screen pb-4'>
            <UnitBar current={currentWeather}/>
            <SearchBar onSearch={handleSubmit}/>
            <div className="grid md:grid-cols-3 md:grid-rows-3 gap-4">
                <div className="md:col-span-2 md:row-span-3 flex flex-col gap-4">
                    <WeatherAtm current={currentWeather} location={location}/>
                    <PerceivedClimate current={currentWeather}/>
                    <DailyForecast current={currentWeather}/>
                </div>
                <div className="md:col-span-1 md:row-span-3">
                    <HourlyForecast current={currentWeather}/>
                </div>
            </div>
            </div>
            );
            }

            export default App;