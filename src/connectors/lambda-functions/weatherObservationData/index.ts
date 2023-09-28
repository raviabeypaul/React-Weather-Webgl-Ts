import { WeatherController } from "adapters/controllers/WeatherController";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import {
  ServiceResponseDto,
  AwsAPIGatewayResponseDto
} from "helpers/ApiResponseDto";
import { WeatherRepository } from "weather-api/repositories/weatherRepository";


export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  // console.log("Event => ", event);

  const response: Partial<ServiceResponseDto> = await WeatherController(WeatherRepository()).weatherObservationHistory(
    JSON.parse(event.body)
  );

  console.log(`Service response => `, response);

  const apiResponse: AwsAPIGatewayResponseDto = {
    body: await JSON.stringify(response.result),
    statusCode: response.hasError == false ? 200 : response.httpStatusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };

  return apiResponse;
};
