import IVideoRepository from '@domain/repositories/video/IVideoRepository';
import ICreateVideoService from './ICreateVideoService';
import { IVideo } from '@domain/schemas/Video';

export default class CreateVideoService implements ICreateVideoService {
  constructor(private videoRepository: IVideoRepository) {}

  public async handle(video: IVideo): Promise<IVideo> {
    return await this.videoRepository.create(video);
  }
}
