import { faker } from '@faker-js/faker';
import CreateVideoService from '../../../src/service/CreateVideo/CreateVideoService';
import VideoRepositoryMock from '../../mocks/VideoRepositoryMock';
import { videoMock } from '../../mocks/VideoMock';
import UnprocessableEntityError from '../../../src/domain/exceptions/UnprocessableEntityError';

describe('CreateVideoService', () => {
  const videoRepositoryMock = new VideoRepositoryMock();
  const createVideoService = new CreateVideoService(videoRepositoryMock);

  it('should create the video #unit', async () => {
    const videoData = {
      title: faker.random.word(),
      description: faker.random.words(4),
      url: faker.internet.url(),
    };

    videoRepositoryMock.listVideos = jest.fn().mockResolvedValueOnce([]);

    const video = await createVideoService.handle(videoData);

    expect(video.url).toEqual(videoData.url);
    expect(video.title).toEqual(videoData.title);
    expect(video.description).toEqual(videoData.description);
    expect(videoRepositoryMock.listVideos).toHaveBeenCalled();
  });

  it('should create the video without description #unit', async () => {
    const videoData = {
      title: faker.random.word(),
      url: faker.internet.url(),
    };

    videoRepositoryMock.listVideos = jest.fn().mockResolvedValueOnce([]);

    const video = await createVideoService.handle(videoData);

    expect(video.url).toEqual(videoData.url);
    expect(video.title).toEqual(videoData.title);
    expect(videoRepositoryMock.listVideos).toHaveBeenCalled();
  });

  it('should not create the video with already exists one with the same url #unit', async () => {
    const videoData = {
      title: faker.random.word(),
      description: faker.random.words(4),
      url: faker.internet.url(),
    };

    videoRepositoryMock.listVideos = jest.fn().mockResolvedValueOnce([videoMock]);

    await expect(createVideoService.handle(videoData)).rejects.toThrow(
      new UnprocessableEntityError(`There's already a video with this url`),
    );
    expect(videoRepositoryMock.listVideos).toHaveBeenCalled();
  });
});
