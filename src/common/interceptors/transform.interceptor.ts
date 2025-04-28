import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  data: T;
  success: boolean;
  errMsg?: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        // 如果返回的数据已经是标准格式，直接返回
        if (data && data.code !== undefined) {
          return data;
        }
        
        // 否则转换为标准格式
        return {
          code: 200,
          success: true,
          data,
          errMsg: null,
        };
      }),
    );
  }
} 