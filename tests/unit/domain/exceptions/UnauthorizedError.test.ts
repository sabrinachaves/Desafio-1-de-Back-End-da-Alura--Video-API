import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import UnauthorizedError from '../../../../src/domain/exceptions/UnauthorizedError';

describe('UnauthorizedError', () => {
  it('should new UnauthorizedError error #unit', () => {
    const message = faker.random.word();
    const unauthorizedError = new UnauthorizedError(message);
    expect(unauthorizedError.message).toEqual(message);
    expect(unauthorizedError.code).toEqual(httpStatus.UNAUTHORIZED);
  });
});
