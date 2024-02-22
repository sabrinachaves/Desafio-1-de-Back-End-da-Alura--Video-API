import { Request } from 'express';
import { CREATED, UNPROCESSABLE_ENTITY } from 'http-status';
import CreateVideoController from '../../../../src/application/v1/controller/CreateVideoController';
import CreateVideoServiceMock from '../../../mocks/CreateVideoServiceMock';
import { IVideo } from '../../../../src/domain/schemas/Video';
import { videoMock } from '../../../mocks/VideoMock';
import UnprocessableEntityError from '../../../../src/domain/exceptions/UnprocessableEntityError';

describe('CreateVideoController', () => {
  const createVideoService = new CreateVideoServiceMock();
  it('should match the snapshot #unit', () => {
    const instance = new CreateVideoController(createVideoService);
    expect(instance).toMatchSnapshot();
  });

  it('should create the video #unit', async () => {
    createVideoService.handle = jest.fn().mockImplementation((): Promise<IVideo> => {
      return Promise.resolve(videoMock);
    });
    const instance = new CreateVideoController(createVideoService);

    const req = {
      body: {
        title: videoMock.title,
        description: videoMock.description,
        url: videoMock.url,
      },
      get: jest.fn(),
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(CREATED);
    expect(mockJsonResponse).toHaveBeenCalledWith(videoMock);
  });

  it('should throw an error when already exists a video with the same url #unit', async () => {
    createVideoService.handle = jest
      .fn()
      .mockRejectedValueOnce(new UnprocessableEntityError(`There's already a video with this url`));

    const instance = new CreateVideoController(createVideoService);

    const req = {
      body: {
        title: videoMock.title,
        description: videoMock.description,
        url: videoMock.url,
      },
      get: jest.fn(),
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(UNPROCESSABLE_ENTITY);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: `There's already a video with this url` });
  });
});
