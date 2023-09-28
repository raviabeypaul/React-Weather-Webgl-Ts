import { AuthController } from "adapters/controllers";
import { SampleController } from "adapters/controllers/SampleController";
import { APIGatewayProxyEvent, Context } from "aws-lambda";


export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
  // { Records }: SQSEvent,
  // context: Context
) => {
  const apiResponse = {};

  const response = await SampleController().get()

  console.log(`Service response => `, response);

  apiResponse["body"] = JSON.stringify(response["result"]);
  apiResponse["statusCode"] =
    response["hasError"] == false ? 200 : response["httpStatusCode"];
  apiResponse["headers"] = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  return apiResponse;
};
