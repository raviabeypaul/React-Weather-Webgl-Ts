import { asyncForEach } from "helpers/objectUtils";
import cron from "node-cron"
import { WeatherCronDto } from "weather-api/dtos/WeatherCronDto";
import { getCronLatLongList } from "weather-api/helpers/ServiceHelper";
import { getObservationAndForecast } from "weather-api/services/ApiService";



export const WeatherUpdateCronTask = cron.schedule('* * * * *',async ()=>{
    let locations : WeatherCronDto[] = await getCronLatLongList()
    console.log("running cron every minute", new Date().getMinutes());
    let locationPromises = [];
    locations.forEach((location)=>{
        locationPromises.push(getObservationAndForecast(location.lat, location.lng))
    })
    let results  = await Promise.allSettled(locationPromises)
    for(let i=0;i<results.length;i++){
        let object = results[i];
        if(object.status==='fulfilled'){
            // console.log(" Promise Fullfilled ", object)
        }else{
            // console.error(" Promise not fullfilled ", object)
        }
    }

})