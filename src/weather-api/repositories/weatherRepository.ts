
import { client } from "connectors/db/mongo/client";
import { Repository } from "./repositoryI";
import { WeatherEntity } from "weather-api/entities/WeatherEntity";

export interface WeatherRepositoryI extends Repository<WeatherEntity> {
  create: (payload: WeatherEntity) => any;
  query: (
    query: Record<string, any>,
    startingOffset: number,
    resultLimit: number
  ) => any;
  distinct: (column: string, query: Record<string, any>) => any;
  update: (payload: Partial<WeatherEntity>) => any;
  aggregate: (pipeline: object[]) => any;
  countDocuments: (query: Record<string, any>) => any;
}


export const WeatherRepository = () : WeatherRepositoryI=>({
    create: async (weather: WeatherEntity) => {
      weather.timeUtc = new Date(weather.time.utc).getTime()/1000
        const result: any = await (await client())
          .collection("weatherInfo")
          .insertOne(weather);
        return result as WeatherEntity;
      },
      get: async (id: string) => {
        const result = await (await client())
          .collection("weatherInfo")
          .findOne({ id : id});
    
        return result;
      },
      update: async ({ lat,lng, ...weather }: Partial<WeatherEntity>) => {
        weather.timeUtc = new Date(weather.time.utc).getTime()/1000
        const result = await (await client())
          .collection("weatherInfo")
          .findOneAndUpdate(
            { lat:lat, },
            { $set: { ...weather, updatedAt: Math.floor(Date.now() / 1000) } },
            { returnDocument: "after" }
          );
    
        return result;
      },
      query: async (
        query: Record<string, any>,
        startingOffset: number,
        resultLimit: number
      ) => {
        let result = [];
    
        result = await (await client())
          .collection("weatherInfo")
          .find(query)
          .skip(startingOffset != undefined ? Number(startingOffset) : 0)
          .limit(resultLimit != undefined ? Number(resultLimit) : 5)
          .sort({ timeUtc: -1 })
          .toArray();
    
        return result;
      },
      distinct: async (column: string, query: Record<string, any>) => {
        let result = [];
    
        result = await (await client()).collection("weatherInfo").distinct(column, query);
    
        return result;
      },
      aggregate: async (pipeline: Record<string, any>[]) => {
        const result = await (await client())
          .collection("weatherInfo")
          .aggregate(pipeline)
          .toArray();
    
        return result;
      },
      countDocuments: async (query: Record<string, any>) => {
        const result = await (await client())
          .collection("weatherInfo")
          .countDocuments(query);
    
        return result;
      },
      
})