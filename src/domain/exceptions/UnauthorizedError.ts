import httpStatus from 'http-status';
import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);
  }
}
