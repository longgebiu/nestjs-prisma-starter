export interface ResponseData<T> {
  code: number;
  success: boolean;
  data: T;
  errMsg: string | null;
}

export class ResponseUtil {
  static success<T>(data: T): ResponseData<T> {
    return {
      code: 200,
      success: true,
      data,
      errMsg: null
    };
  }

  static error(errMsg: string, code: number = 0): ResponseData<null> {
    return {
      code,
      success: false,
      data: null,
      errMsg
    };
  }

  static errorWithData<T>(errMsg: string, data: T): ResponseData<T> {
    return {
      code: 200,
      success: false,
      data,
      errMsg
    };
  }
} 