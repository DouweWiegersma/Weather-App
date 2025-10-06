import {convertTemp, convertWind, convertPrecipitation} from "../Helpers/conversion.js";
import {useUnits} from "../Context/UnitsContext.jsx";

function PerceivedClimate({current}){
    const { tempUnit, windUnit, precipitationUnits } = useUnits();
    const hasData = current && current.current_weather;
    const rawTime = hasData ? current.current_weather.time : null
    const roundedTime = hasData ? rawTime.slice(0, 14) + "00" : null
    const times = hasData ? current.hourly.time : null
    const index = hasData ? times.findIndex((t) => t === roundedTime) -1 : null

    const humidity = hasData ? current.hourly.relative_humidity_2m[index] : null
    const humidityUnit = hasData ? current.hourly_units.relative_humidity_2m : null
    const feelsLike = hasData ? current.hourly.apparent_temperature[index] : null
    const precipitation = hasData ? current.hourly.precipitation[index] : null
    const wind = hasData ? current.current_weather.windspeed : null

    return(
        <>

            <div className='grid grid-cols-2 grid-rows-2 m-3 gap-3'>
                <div className='flex flex-col p-6 bg-gray-800 gap-2 rounded-2xl text-white'>
                    <p className='text-lg'>Humidity</p>
                    <p className='text-2xl'>{humidity} {humidityUnit}</p>
                </div>

                <div className='flex flex-col p-6 bg-gray-800 gap-2 rounded-2xl text-white'>
                    <p className='text-lg'>Feels like</p>
                    <p className='text-2xl'>{Math.round(convertTemp(feelsLike, tempUnit))}°{tempUnit}</p>
                </div>


                <div className='flex flex-col p-6 bg-gray-800 gap-2 rounded-2xl text-white'>
                    <p className='text-lg'>Precipitation </p>
                    <p className='text-2xl'> {convertPrecipitation(precipitation, precipitationUnits)} {precipitationUnits}</p>
                </div>

                <div className='flex flex-col p-6 bg-gray-800 gap-2 rounded-2xl text-white'>
                    <p className='text-lg'>Wind</p>
                    <p className='text-2xl'>{Math.round(convertWind(wind, windUnit))} {windUnit} </p>
                </div>
            </div>



        </>
    )
}
export default PerceivedClimate;