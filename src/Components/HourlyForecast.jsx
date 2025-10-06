import {useState} from "react";
import {getWeatherIcon} from "../Helpers/weatherCode.js";
import {convertTemp} from "../Helpers/conversion.js";
import {useUnits} from "../Context/UnitsContext.jsx";
function HourlyForecast({ current }) {
    const hasData = current && current.current_weather;
    const temp = hasData ? current.hourly.temperature_2m : [];
    const time = hasData ? current.hourly.time : [];
    const weatherCode = hasData ? current.hourly.weather_code : [];
    const { tempUnit } = useUnits();

    const hourlyData = time.map((t, i) => {
        const [date, hour] = t.split("T");
        const day = new Date(date).toLocaleDateString("en-EN", { weekday: "long" });
        return {
            date,
            day,
            hour,
            temp: convertTemp(temp[i], tempUnit),
            code: weatherCode[i],
        };
    });

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const [selectedDay, setSelectedDay] = useState("");

    const dayData = selectedDay
        ? hourlyData.filter((item) => item.day === selectedDay)
        : [];

    return (
        <div className='bg-gray-600 p-4 rounded-2xl m-4'>
            <div className='flex justify-evenly text-white text-lg font-bold'>
            <h1>Hourly Forecast</h1>

            {/* Select input voor de dagen */}
            <select className='bg-gray-600 w-28' value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                <option className='bg-gray-600' value="">day</option>
                {days.map((day) => (
                    <option key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                    </option>
                ))}
            </select>
            </div>

            {/* Toon de data voor de geselecteerde dag */}
            {dayData.length > 0 && (
                <div>
                    {dayData.map((item, i) => (
                        <div key={i} className='flex justify-between items-center text-lg text-white bg-gray-800 p-3 m-4 rounded'>
                            <div className='flex items-center gap-1'>
                            <img src={getWeatherIcon(item.code)} alt="weather icon" width={50}/>
                            <p>{item.hour}</p>
                            </div>
                            <p>{item.temp.toFixed(1)}°{tempUnit}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HourlyForecast