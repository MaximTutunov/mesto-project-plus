import STATUS_CODES from '../utils/constants';
import { IHttpException } from '../types';

class NotFoundErr implements IHttpException {
  statusCode: number;

  name: string;

  message: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'Not Found error';
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export default NotFoundErr;
