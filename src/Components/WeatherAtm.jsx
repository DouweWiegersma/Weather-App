import {formatISODate} from "../Helpers/formatIsoDate.js";
import {useUnits} from "../Context/UnitsContext.jsx";
import {getWeatherIcon} from "../Helpers/weatherCode.js";
import {convertTemp} from "../Helpers/conversion.js";
function WeatherAtm({current, location}) {
    const { tempUnit } = useUnits();

    const hasData = current && current.current_weather;
    const isoDate = hasData ? current.current_weather.time : null;
    const date = hasData ? formatISODate(isoDate) : null;
    const temp = hasData ? current.current_weather.temperature : null;


    const icon = hasData ? getWeatherIcon(current.current_weather.weathercode) : null;



    // const rawTime = hasData ? current.current_weather.time : null
    // const roundedTime = hasData ? rawTime.slice(0, 14) + "00" : null
    // const times = hasData ? current.hourly.time : null
    // const index = hasData ? times.findIndex((t) => t === roundedTime) -1 : null
    // const humidity = hasData ? current.hourly.relative_humidity_2m[index] : null
    // const feelsLike = hasData ? current.hourly.apparent_temperature[index] : null


    return (
        <>

            {hasData ? (
                <div
                    className='m-5 max-h-full min-h-80 bg-no-repeat bg-cover bg-center rounded-2xl p-6 text-white flex flex-col justify-evenly gap-4'
                    style={{backgroundImage: "url('/bg-today-large.svg')"}}>
                    <h2 className='text-2xl text-center font-bold mt-2'>{location?.name}, {location?.country}</h2>
                    <p className='text-lg text-center'>{date}</p>
                    <div className='flex flex-row justify-center align-middle'>
                        <img src={icon} alt='weatherIcon' className='w-3/5'/>
                        <div className='flex flex-col gap-4 align-middle justify-center'>
                            <p className='text-6xl'>{Math.round(convertTemp(temp, tempUnit))}°{tempUnit}</p>
                        </div>
                    </div>

                </div>) : (
                <div
                    className='m-5 max-h-80 min-h-80 bg-no-repeat bg-cover bg-center rounded-2xl p-6 text-white flex flex-col justify-evenly gap-4'
                    style={{backgroundImage: "url('/bg-today-large.svg')"}}>
                    <p className="text-center text-xl mt-10">
                        Geen weerinformatie beschikbaar
                    </p>
                </div>
            )}




        </>

    )
}

export default WeatherAtm;