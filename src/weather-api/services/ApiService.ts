import { asyncForEach } from "helpers/objectUtils";
import { get } from "helpers/restCall"
import { WeatherEntity } from "weather-api/entities/WeatherEntity";
import { WeatherRepository } from "weather-api/repositories/weatherRepository";
import { CreateWeather } from "weather-api/use-cases/create";
import { QueryWeather } from "weather-api/use-cases/query";
import { UpdateWeather } from "weather-api/use-cases/update";

export const getWeatherObservationData = async (lat: number, lng: number) => {
  let url = `https://weatherapi.pelmorex.com/v1/observation?lat=${lat}&long=${lng}`
  const headers = {
    "Content-Type": "application/json"
  };
  let response = await get(url, headers)
  return response;
  // console.log('response = ',  response)
}
export const getWeatherShortForecastData = async (lat: number, lng: number) => {
  let url = `https://weatherapi.pelmorex.com/v1/shortterm?lat=${lat}&long=${lng}`
  const headers = {
    "Content-Type": "application/json"
  };
  let response = await get(url, headers)
  return response    // console.log('response = ',  response)
}

export const getObservationAndForecast = async (lat, lng) => {
  console.log("running cron every minute", new Date().getMinutes());
  let finalResult = [];
  let weatherObserversationPromise = new Promise(async (resolve) => {
    resolve({
      type: 'weatherObservable',
      data: await getWeatherObservationData(lat, lng)
    })
  })
  let weatherShortForecastPromise = new Promise(async (resolve) => {
    resolve({
      type: 'weatherShortForecast',
      data: await getWeatherShortForecastData(lat, lng)
    })
  })

  let result = await Promise.allSettled([weatherObserversationPromise, weatherShortForecastPromise])

  for (let i = 0; i < result.length; i++) {
    let object = result[i];
    if (object.status === 'fulfilled') {
      if (object.value && object.value['type'] === 'weatherObservable') {
        let weatherEntity: WeatherEntity = object.value["data"];
        weatherEntity.type = 'Observation';
        weatherEntity.lat = lat;
        weatherEntity.lng = lng;
        finalResult.push(object)
        let query  = {lat :  weatherEntity.lat, lng : weatherEntity.lng, type : weatherEntity.type }
        let results =  await QueryWeather(query, 0, 1, WeatherRepository())
        if(results.length>0){
          await UpdateWeather(weatherEntity, WeatherRepository())  
          console.log("[observation] updating weather Entity : utc time : ", weatherEntity.time.utc + " period : ", weatherEntity.period)
        }else{
          await CreateWeather(weatherEntity,WeatherRepository())
          console.log("[observation] creating weather Entity : utc time : ", weatherEntity.time.utc + " period : ", weatherEntity.period)
        }
      } else if (object.value && object.value['type'] === 'weatherShortForecast') {
        let shortTermforecastList: WeatherEntity[] = object.value["data"].shortterm;
        await asyncForEach(shortTermforecastList, async (weatherEntity) => {
          weatherEntity.type = 'Short-Forcast';
          weatherEntity.lat = lat;
          weatherEntity.lng = lng;
          finalResult.push(object)
          let query  = {lat :  weatherEntity.lat, lng : weatherEntity.lng, type : weatherEntity.type, period : weatherEntity.period, "time.utc": weatherEntity.time.utc }
          let results =  await QueryWeather(query, 0, 1, WeatherRepository())
          if(results.length>0){
            await UpdateWeather(weatherEntity, WeatherRepository())  
            console.log(`[Short-Forecast ]Updating weather entity : utc time : `, weatherEntity.time.utc , " period : ", weatherEntity.period)
          }else{
            await CreateWeather(weatherEntity,WeatherRepository())
            console.log(`[Short-Forecast ]Creating weather entity : utc time : `, weatherEntity.time.utc , " period : ", weatherEntity.period)
          }
          
        })
      }
    } else {
      finalResult.push(object)
    }
  }
  return finalResult;
}