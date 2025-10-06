import SearchBar from "./Components/SearchBar.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import WeatherAtm from "./Components/WeatherAtm.jsx";
import PerceivedClimate from "./Components/Perceivedclimate.jsx";
import DailyForecast from "./Components/DailyForecast.jsx";
import UnitBar from "./Components/UnitBar.jsx";
import HourlyForecast from "./Components/HourlyForecast.jsx";



function App() {

const [location, setLocation] = useState([])
const [currentWeather, setCurrentWeather] = useState([])

async function handleSubmit(cityName) {
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
    }
}


useEffect(() => {
    if(!location) return;
    async function current() {
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
                    daily: ['temperature_2m_mean', 'apparent_temperature_mean', 'weather_code', 'apparent_temperature_min' , 'apparent_temperature_max', 'precipitation_sum']
                }
            })
            console.log(response.data)
            setCurrentWeather(response.data)
        } catch (e) {
            console.error(e, 'Failed to get data')
        }
    }

    current()
}, [location])

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