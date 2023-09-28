import { Application } from "express";
import { handlers } from "../handlers";
import { handler } from "connectors/lambda-functions/test";

export const routes = (app: Application) => {
  app.get("/test", handlers.test);
  app.post("/observation", handlers.observation)
  app.post("/forecast", handlers.shortForecast)
  };
