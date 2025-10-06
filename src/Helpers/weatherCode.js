import Sun from '../assets/img/icon-sunny.webp'
import Rain from '../assets/img/icon-rain.webp'
import Snow from '../assets/img/icon-snow.webp'
import Storm from '../assets/img/icon-storm.webp'
import PartlyCloudy from '../assets/img/icon-partly-cloudy.webp'
import Fog from '../assets/img/icon-fog.webp'
import Cloud from '../assets/img/icon-overcast.webp'

export function getWeatherIcon(code) {
    if (code === 0 || code === 1) return Sun;
    if (code === 2 || code === 3) return PartlyCloudy;
    if (code === 45 || code === 48) return Fog;
    if (code >= 51 && code <= 67) return Rain;
    if (code >= 71 && code <= 77) return Snow;
    if (code >= 95 && code <= 99) return Storm;
    return Cloud;
}