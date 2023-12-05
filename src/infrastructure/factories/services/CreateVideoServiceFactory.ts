import IVideoRepository from '@domain/repositories/video/IVideoRepository';
import CreateVideoService from '@service/CreateVideo/CreateVideoService';
import ICreateVideoService from '@service/CreateVideo/interfaces/ICreateVideoService';
import VideoRepositoryFactory from '../repositories/VideoRepositoryFactory';

export default class CreateVideoServiceFactory {
  private static service: ICreateVideoService;
  private static videoRepository: IVideoRepository;

  static async make(videoRepository?: IVideoRepository): Promise<ICreateVideoService> {
    if (this.service) {
      return this.service;
    }

    this.videoRepository = videoRepository || (await VideoRepositoryFactory.make());

    this.service = new CreateVideoService(this.videoRepository);
    return this.service;
  }
}
