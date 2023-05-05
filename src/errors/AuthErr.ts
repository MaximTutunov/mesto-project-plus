import STATUS_CODES from '../utils/constants';
import { IHttpException } from '../types';

class AuthErr implements IHttpException {
  statusCode: number;

  name: string;

  message: string;

  constructor(message:string) {
    this.message = message;
    this.name = 'Authorization error';
    this.statusCode = STATUS_CODES.AUTH_ERROR;
  }
}

export default AuthErr;
