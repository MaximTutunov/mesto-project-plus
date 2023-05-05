import STATUS_CODES from '../utils/constants';
import { IHttpException } from '../types';

class ForbiddenErr implements IHttpException {
  statusCode: number;

  name: string;

  message: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'Access forbidden';
    this.statusCode = STATUS_CODES.FORBIDDEN_ERROR;
  }
}

export default ForbiddenErr;
