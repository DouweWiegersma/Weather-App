import {useUnits} from "../Context/UnitsContext.jsx";
import {useState} from "react";
import Check from "../assets/img/icon-checkmark.svg?react";
import DropDown from "../assets/img/icon-dropdown.svg?react";
import Settings from "../assets/img/icon-units.svg?react";
export default function UnitsMenu() {
    const { tempUnit, windUnit, setTemperatureUnit, setWindSpeedUnit, toggleUnit, units, precipitationUnits, setPrecipitationUnits } = useUnits();
    const [open, toggleOpen] = useState(false)
    function Open(){
        if (open === false){
            toggleOpen(true)
        }
        else{
            toggleOpen(false)
        }
    }

    return (

        <div className="bg-slate-900 text-white p-4 rounded-xl w-44 space-y-4 absolute right-2 z-10">

            <button onClick={Open} className="flex justify-evenly items-center w-32"> <Settings/> Units <DropDown/> </button>


            {open &&
                <div>
                    <button onClick={toggleUnit}>{units ? <p>Switch to imperial</p> :
                        <p>Switch to metric</p>}  </button>
                    <p className="text-sm text-gray-400">Temperature</p>
                    <button
                        onClick={() => setTemperatureUnit("C")}
                        className="flex justify-between w-full py-2 px-3 rounded hover:bg-slate-800"
                    >
                        Celsius (°C) {tempUnit === "C" && <Check className="w-4 h-4 z-20"/>}
                    </button>
                    <button
                        onClick={() => setTemperatureUnit("F")}
                        className="flex justify-between w-full py-2 px-3 rounded hover:bg-slate-800"
                    >
                        Fahrenheit (°F) {tempUnit === "F" && <Check className="w-4 h-4 z-20"/>}
                    </button>


                    {/* Wind Speed */}
                    <p className="text-sm text-gray-400">Wind Speed</p>
                    <button
                        onClick={() => setWindSpeedUnit("km/h")}
                        className="flex justify-between w-full py-2 px-3 rounded hover:bg-slate-800"
                    >
                        km/h {windUnit === "km/h" && <Check className="w-4 h-4 z-20"/>}
                    </button>
                    <button
                        onClick={() => setWindSpeedUnit("mph")}
                        className="flex justify-between w-full py-2 px-3 rounded hover:bg-slate-800"
                    >
                        mph {windUnit === "mp/h" && <Check className="w-4 h-4 z-20"/>}
                    </button>
                    <p className="text-sm text-gray-400">precipitation</p>
                    <button
                        onClick={() => setPrecipitationUnits("mm")}
                        className="flex justify-between w-full py-2 px-3 rounded hover:bg-slate-800"
                    >
                        millimeters (mm) {precipitationUnits === "mm" && <Check className="w-4 h-4 z-20"/>}
                    </button>
                    <button
                        onClick={() => setPrecipitationUnits("in")}
                        className="flex justify-between w-full py-2 px-3 rounded hover:bg-slate-800"
                    >
                        inch (in) {precipitationUnits === "in" && <Check className="w-4 h-4 z-20"/>}
                    </button>

                </div>}
        </div>
    );
}