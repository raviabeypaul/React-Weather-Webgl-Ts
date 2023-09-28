import { WeatherRepositoryI } from "weather-api/repositories/weatherRepository";
export const CountWeatherDocuments = async (
  query: object,
  repository: WeatherRepositoryI
) => await repository.countDocuments(query);

