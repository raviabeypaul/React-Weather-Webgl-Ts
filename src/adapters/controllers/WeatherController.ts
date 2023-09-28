import { AppResponseDto } from "helpers/ApiResponseDto";
import { AppError } from "helpers/AppError";
import { APP_CODES, APP_MESSAGE, HTTP_CODES } from "helpers/constants";
import { WeatherDataReq, WeatherDataShortForecastReq } from "weather-api/dtos/WeatherObservReq";
import { WeatherRepositoryI } from "weather-api/repositories/weatherRepository";
import { getObservationData, getShortForecastData } from "weather-api/services/get";

export const WeatherController = (weatherRepository : WeatherRepositoryI) => ({
   weatherObservationHistory: async (weatherDataReq: WeatherDataReq): Promise<AppResponseDto> => {  
    console.info("inside login");
    let results = await getObservationData(weatherDataReq)
    let response : AppResponseDto = {
      appCode : 2000,
      httpCode : 200,
      message :' success',
      result : results
    }
    return response
  },
  weatherShortForecastHistory: async (weather : WeatherDataShortForecastReq) : Promise<AppResponseDto>=>{
    let results = await getShortForecastData(weather)
    let response : AppResponseDto = {
      appCode : 2000,
      httpCode : 200,
      message :' success',
      result : results
    }
    return response
  }
});
