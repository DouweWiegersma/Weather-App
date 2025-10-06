import { createContext, useContext, useState } from "react";

// Context aanmaken
const UnitsContext = createContext();

// Provider
export function UnitsProvider({ children }) {
    const [tempUnit, setTempUnit] = useState("C");
    const [windUnit, setWindUnit] = useState("km/h")
    const [precipitationUnits, setPrecipitationUnits] = useState("mm")
    const [units, toggleUnits] = useState(false)
    // Toggle functie
    function toggleUnit() {
        setTempUnit((prev) => (prev === "C" ? "F" : "C"));
        setWindUnit((prev) => (prev === "km/h" ? "mp/h" : "km/h"));
        setPrecipitationUnits((prev) => prev === "mm" ? "in" : "mm")
        if (units === false){
        toggleUnits(true)
        }
        else{
            toggleUnits(false)
        }
    }


    return (
        <UnitsContext.Provider value={{tempUnit, toggleUnit, windUnit, units, toggleUnits, precipitationUnits}}>
            {children}
        </UnitsContext.Provider>
    );
}

export function useUnits() {
    const context = useContext(UnitsContext);
    if (!context) {
        throw new Error("useUnits must be used within a UnitsProvider");
    }
    return context;
}

