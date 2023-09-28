import { WeatherEntity } from "weather-api/entities/WeatherEntity";
import { WeatherRepositoryI } from "weather-api/repositories/weatherRepository";

export const CreateWeather = async (
  weatherEntity: WeatherEntity,
  repository: WeatherRepositoryI
) => {
  return await repository.create(weatherEntity);
};
