import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import UnprocessableEntityError from '../../../../src/domain/exceptions/UnprocessableEntityError';

describe('UnprocessableEntityError', () => {
  it('should new UnprocessableEntity error #unit', () => {
    const message = faker.random.word();
    const unprocessableEntityError = new UnprocessableEntityError(message);
    expect(unprocessableEntityError.message).toEqual(message);
    expect(unprocessableEntityError.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
