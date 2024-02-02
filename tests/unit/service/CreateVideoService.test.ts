import { faker } from '@faker-js/faker';
import CreateVideoService from '../../../src/service/CreateVideo/CreateVideoService';
import VideoRepositoryMock from '../../mocks/VideoRepositoryMock';

describe('CreateVideoService', () => {
  const videoRepositoryMock = new VideoRepositoryMock();
  const createVideoService = new CreateVideoService(videoRepositoryMock);

  it('should create the video #unit', async () => {
    const videoData = {
      title: faker.random.word(),
      description: faker.random.words(4),
      url: faker.internet.url(),
    };
    const video = await createVideoService.handle(videoData);

    expect(video.url).toEqual(videoData.url);
    expect(video.title).toEqual(videoData.title);
    expect(video.description).toEqual(videoData.description);
  });

  it('should create the video without description #unit', async () => {
    const videoData = {
      title: faker.random.word(),
      url: faker.internet.url(),
    };
    const video = await createVideoService.handle(videoData);

    expect(video.url).toEqual(videoData.url);
    expect(video.title).toEqual(videoData.title);
  });
});
