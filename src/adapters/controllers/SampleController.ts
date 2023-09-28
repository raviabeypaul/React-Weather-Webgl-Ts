import { AppResponseDto } from "helpers/ApiResponseDto";
import { AppError } from "helpers/AppError";
import { APP_CODES, HTTP_CODES } from "helpers/constants";

export const SampleController = ()=>({
    get: async () : Promise<AppResponseDto> => {
      try{
      return {
        appCode : 2000,
        httpCode : HTTP_CODES.SUCCESS,
        message : 'success',
        result : 'sample data'
      }
    } catch (error) {
      console.error(`[ERROR] Refresh token service error => ${error}`);
      throw new AppError(HTTP_CODES.SERVER_ERROR, 5000, "sample message",[])
    }
  },
})