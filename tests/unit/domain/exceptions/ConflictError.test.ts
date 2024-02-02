import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import ConflictError from '../../../../src/domain/exceptions/ConflictError';

describe('ConflictError', () => {
  it('should new Conflict error #unit', () => {
    const message = faker.random.word();
    const conflictError = new ConflictError(message);
    expect(conflictError.message).toEqual(message);
    expect(conflictError.code).toEqual(httpStatus.CONFLICT);
  });
});
