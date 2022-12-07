export class BaseError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
      super();
      Object.setPrototypeOf(this, new.target.prototype);
      this.message = message;
      this.statusCode = statusCode;
      Error.captureStackTrace(this);
    }
  }