import { Model } from 'mongoose';
import { IVideo } from '../../../../src/domain/schemas/Video';
import VideoRepository from '../../../../src/domain/repositories/video/VideoRepository';
import { videoMock } from '../../../mocks/VideoMock';

describe('VideoRepository', () => {
  let mongodbMock = {} as Model<IVideo>;

  beforeEach(() => {
    mongodbMock = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      startSession: jest.fn(),
    } as unknown as Model<IVideo>;
  });

  describe('Smoke tests', () => {
    it('should exist #sanity', () => {
      expect(VideoRepository).toBeDefined();
    });

    const functionsName = ['create'];
    it.each(functionsName)('should have %s function #sanity', (functionName) => {
      const instance = new VideoRepository(mongodbMock);
      expect(instance).toHaveProperty(functionName);
    });
  });

  describe('create #unit', () => {
    it('should create video from database', async () => {
      mongodbMock.create = jest.fn().mockImplementation(() => Promise.resolve(videoMock));

      const instance = new VideoRepository(mongodbMock);
      const video = await instance.create(videoMock);

      expect(video).toBe(videoMock);
      expect(mongodbMock.create).toHaveBeenCalled();
    });
  });
});
