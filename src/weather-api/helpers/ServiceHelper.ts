import { WeatherCronDto } from "weather-api/dtos/WeatherCronDto"

export const getCronLatLongList = () : Promise <Array<WeatherCronDto>>=> {
    let weatherCronDto : WeatherCronDto = {
        lat : 43.5100092,
        lng : -79.8976626
    }
    return new Promise(function(resolve){
        resolve([weatherCronDto])
    })
}