import { ServiceResponseDto } from "./ApiResponseDto";

export const createServiceResponse = async (
  hasError: boolean,
  httpStatusCode: number,
  code: number,
  message: string,
  error: any[] = [],
  result: any = null
): Promise<ServiceResponseDto> => {
  return {
    hasError: hasError,
    httpStatusCode: httpStatusCode,
    result: {
      code: code,
      message: message,
      error: error,
      result: result
    }
  };
};
