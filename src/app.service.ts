import { Injectable } from '@nestjs/common';
import { ResponseUtil } from './common/utils/response.util';

@Injectable()
export class AppService {
  getServerItems() {
    return ResponseUtil.success('server-items');
  }

  getHello() {
    return ResponseUtil.success('Hello World!');
  }

  getHelloName(name: string) {
    return ResponseUtil.success(`Hello ${name}!`);
  }
}
