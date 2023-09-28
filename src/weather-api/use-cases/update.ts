import { WeatherEntity } from "weather-api/entities/WeatherEntity";
import { WeatherRepositoryI } from "weather-api/repositories/weatherRepository";

export const UpdateWeather = async (
  payload: Partial<WeatherEntity>,
  repository: WeatherRepositoryI
) => {
  return await repository.update(payload);
};