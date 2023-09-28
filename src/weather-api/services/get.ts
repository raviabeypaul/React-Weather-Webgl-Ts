import { WeatherDataReq, WeatherDataShortForecastReq } from "weather-api/dtos/WeatherObservReq"
import { Constants } from "weather-api/helpers/Constants"
import { WeatherRepository } from "weather-api/repositories/weatherRepository"
import { QueryWeather } from "weather-api/use-cases/query"

export const getObservationData = async (weatherDataReq : WeatherDataReq)=>{
    let query = {lat : weatherDataReq.lat, lng : weatherDataReq.lng, type : Constants.OBSERVATION_TYPE.WEATHER_OBSERVABLE}
    let result  = await QueryWeather(query,weatherDataReq.startingOffset,weatherDataReq.resultLimit,WeatherRepository())
    return result
}

export const getShortForecastData = async (weatherDataShortForecast : WeatherDataShortForecastReq)=>{
    let dateTs = new Date(weatherDataShortForecast.utcDate).getTime()/1000;
    let query = {lat : weatherDataShortForecast.lat, lng : weatherDataShortForecast.lng, type : Constants.OBSERVATION_TYPE.WEATHER_OBSERVABLE, timeUtc : {$gte : dateTs}}
    let result  = await QueryWeather(query,weatherDataShortForecast.startingOffset,weatherDataShortForecast.resultLimit,WeatherRepository())
    return result
}