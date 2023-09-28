import { WeatherRepositoryI } from "weather-api/repositories/weatherRepository";

export const GetWeather = async (
  id: string,
  repository: WeatherRepositoryI
) => await repository.get(id);

