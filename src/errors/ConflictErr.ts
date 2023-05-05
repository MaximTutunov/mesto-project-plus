import STATUS_CODES from '../utils/constants';
import { IHttpException } from '../types';

class ConflictErr implements IHttpException {
  statusCode: number;

  name: string;

  message: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'Conflict error';
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

export default ConflictErr;
