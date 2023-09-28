import { ForecastType, WeatherEntity } from "weather-api/entities/WeatherEntity";
import { WeatherRepositoryI } from "weather-api/repositories/weatherRepository";


export const QueryWeather = async (
  query: any,
  startingOffset: number,
  resultLimit: number,
  repository: WeatherRepositoryI
) => {
  return await repository.query(query, startingOffset, resultLimit);
};

export const QueryWeatherByLatLng = async (
  repository: WeatherRepositoryI,
  lat: number,
  lng : number,
  utcTIme : string,
  forecastType : ForecastType
): Promise<WeatherEntity> => {
  let userQuery = {
    "lat": lat,
    "lng" : lng,
    "time.utc" : utcTIme,
    "type" : forecastType
  };
  console.log("Query Weather Query => ", userQuery);

  const results = await repository.query(userQuery, 0, 1);
  console.log("query results => ", results);

  return results.length > 0 ? results[0] : null;
};

export const Query = async (
  query: any,
  startingOffset: number,
  resultLimit: number,
  repository: WeatherRepositoryI
) => {
  console.log("Query Logistics");

  return await repository.query(query, startingOffset, resultLimit);
};