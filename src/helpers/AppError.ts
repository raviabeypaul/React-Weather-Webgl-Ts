import { error } from "console";

export class AppError extends Error {
  httpStatusCode: number;
  appErrorCode: number;
  message: string;
  errors: any[];
  constructor(
    httpStatusCode: number,
    appErrorCode: number,
    message: string,
    errors: any[]
  ) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.appErrorCode = appErrorCode;
    this.message = message;
    this.errors = errors;
  }
}