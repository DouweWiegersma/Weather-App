import {getWeatherIcon} from "../Helpers/weatherCode.js";
import {useUnits} from "../Context/UnitsContext.jsx";
import {convertTemp} from "../Helpers/conversion.js";

function DailyForecast({current}){
    const { tempUnit } = useUnits();
    const hasData = current && current.current_weather;
    const minTemp = hasData ? current.daily.apparent_temperature_min : null;
    const maxTemp = hasData ? current.daily.apparent_temperature_max : null;
    const weatherCode = hasData ? current.daily.weather_code : null;
    const days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];



    return(
        <>
            <div>
                <h1 className='text-white text-center text-2xl font-bold mt-14'>Daily forecast</h1>
                <div className="grid grid-cols-3 gap-3 m-6">
                    {hasData && weatherCode.map((code, index) => (
                        <div key={index} className="rounded-lg flex flex-col items-center justify-evenly text-white bg-gray-800 h-40">
                            <p>{days[index]}</p>
                            <img
                                src={getWeatherIcon(code)}
                                alt={`Weather for ${days[index]}`}
                                className="w-16 h-16"/>
                            <div className='flex gap-6'>
                                <p>{Math.round(convertTemp(minTemp[index], tempUnit))}°{tempUnit}</p>
                                <p>{Math.round(convertTemp(maxTemp[index], tempUnit))}°{tempUnit}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}

export default DailyForecast;