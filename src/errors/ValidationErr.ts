import STATUS_CODES from '../utils/constants';
import { IHttpException } from '../types';

class ValidationErr implements IHttpException {
  statusCode: number;

  name: string;

  message: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'Bad request';
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

export default ValidationErr;
