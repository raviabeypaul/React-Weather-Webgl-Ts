export interface WeatherTime{
    local : string;
    utc : string;
}
export interface WeatherValue {
    value : string;
}
export interface WeatherWind {
    direction : string;
    speed : number;
    gust : number;
}
export type ForecastType  = 'Observation'|'Short-Forcast'
export interface WeatherEntity {
    type?:ForecastType;
    timeUtc ?: number;
    lat : number;
    lng: number;
    period : number;
    time : WeatherTime;
    weatherCode : WeatherValue;
    cloudCover : number;
    potentialForThunder: number;
    temperature: WeatherValue;
    dewPoint: number;
    feelsLike: number;
    wind : WeatherWind;
    pop : number;
    pressure : number;
    relativeHumidity : WeatherValue;
    rain : WeatherValue;
    snow : WeatherValue;
  }