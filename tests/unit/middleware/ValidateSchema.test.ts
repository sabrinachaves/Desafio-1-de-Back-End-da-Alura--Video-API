import { Request } from 'express';
import { faker } from '@faker-js/faker';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';

import { validateSchema } from '../../../src/application/v1/middlewares/ValidateSchema';

describe('validateSchema', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not allow invalid validator schema #unit', () => {
    const req = { params: { id: '123' } } as unknown as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('invalidSchema', 'params')(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ error: 'Fail to validate request' });
  });

  describe('CreateVideo', () => {
    it('should not allow create video without title #unit', () => {
      const req = {
        body: {
          description: faker.random.words(4),
          url: faker.internet.url(),
        },
      } as unknown as Request;
      const res: any = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      validateSchema('createVideo', 'body')(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ error: '"title" is required' });
    });

    it('should not allow create video without url #unit', () => {
      const req = {
        body: {
          title: faker.random.words(4),
          description: faker.random.words(4),
        },
      } as unknown as Request;
      const res: any = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      validateSchema('createVideo', 'body')(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ error: '"url" is required' });
    });
  });
});
