import VideoRepositoryFactory from '../../../../../src/infrastructure/factories/repositories/VideoRepositoryFactory';
import VideoRepository from '../../../../../src/domain/repositories/video/VideoRepository';

describe('VideoRepositoryFactory', () => {
  it('should make the video repository #unit', async () => {
    const videoRepository = await VideoRepositoryFactory.make();

    expect(videoRepository).toBeInstanceOf(VideoRepository);
    expect(videoRepository).toHaveProperty('create');
  });
});
