import { Request, Response } from "express";
import { SampleController } from "adapters/controllers/SampleController";
import { WeatherController } from "adapters/controllers/WeatherController";
import { WeatherRepository } from "weather-api/repositories/weatherRepository";

export const handlers = {
  test: async (req: Request, res: Response) => {
    let response =  await SampleController().get()
    return res.json(response)
  },
  observation : async(req : Request, res: Response)=>{
    let response = await WeatherController(WeatherRepository()).weatherObservationHistory(req.body)
    return res.json(response)
  },
  shortForecast :async(req : Request, res: Response)=>{
    let response = await WeatherController(WeatherRepository()).weatherShortForecastHistory(req.body)
    return res.json(response) 
  }
};
