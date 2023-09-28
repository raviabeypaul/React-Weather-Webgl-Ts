import express, { Application } from "express";
import bodyParser from "body-parser";

import { routes } from "./Routes/routes";
import { WeatherUpdateCronTask } from "weather-api/schedulers";
import { forEach } from "ramda";

export const createServer = (): Application => {
  const app: Application = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  routes(app);
  return app;
};

const runCros = ()=>{
  let crons = getCrons()
  crons.forEach(element => {
    element.start()
  });
}

const getCrons =()=>{
  return [WeatherUpdateCronTask]
}