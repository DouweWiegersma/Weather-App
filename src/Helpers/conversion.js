export function convertTemp(temp, unit) {
    if (unit === "F") {
        return temp * 9/5 + 32;
    }
    return temp;
}


export function convertWind(value, unit) {
    if (value == null) return null;
    if (unit === "km/h") {
        return value;
    } else if (unit === "mp/h") {
        return value / 1.60934;
    }
}


export function convertPrecipitation(value, unit, decimals = 1) {
    if (value === null || isNaN(value)) return null;

    let result;
    if (unit === "mm") {
        result = value;
    } else {
        result = value / 25.4;
    }

    return Number(result.toFixed(decimals));
}