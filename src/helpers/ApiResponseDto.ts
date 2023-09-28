export interface ApiResponseDto {
  code: number;
  message: string;
  error: any[];
  result: any;
}

export interface ServiceResponseDto {
  hasError: boolean;
  httpStatusCode: number;
  result: ApiResponseDto;
}

export interface AwsAPIGatewayResponseDto {
  headers: object;
  body: string;
  statusCode: number;
}

export interface AppResponseDto {
  httpCode : number;
  appCode : number;
  message : String;
  error ?: any;
  result ?: any;
}