import VideoRepository from '../../../../../src/domain/repositories/video/VideoRepository';
import CreateVideoServiceFactory from '../../../../../src/infrastructure/factories/services/CreateVideoServiceFactory';
import CreateVideoService from '../../../../../src/service/CreateVideo/CreateVideoService';

describe('CreateVideoServiceFactory', () => {
  it('should make the video create service #unit', async () => {
    const service = await CreateVideoServiceFactory.make({} as VideoRepository);

    expect(service).toBeInstanceOf(CreateVideoService);
    expect(service).toHaveProperty('handle');
  });
});
