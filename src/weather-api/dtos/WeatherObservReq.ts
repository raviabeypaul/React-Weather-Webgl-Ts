export interface WeatherDataReq {
    lat : number,
    lng : number,
    startingOffset : number; 
    resultLimit : number;
}

export interface WeatherDataShortForecastReq {
    lat: number; 
    lng: number; 
    startingOffset: number; 
    resultLimit: number
    utcDate : string;
}