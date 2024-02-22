import IVideoRepository from '@domain/repositories/video/IVideoRepository';
import ICreateVideoService from './ICreateVideoService';
import { IVideo } from '@domain/schemas/Video';
import UnprocessableEntityError from '@domain/exceptions/UnprocessableEntityError';

export default class CreateVideoService implements ICreateVideoService {
  constructor(private videoRepository: IVideoRepository) {}

  public async handle(data: IVideo): Promise<IVideo> {
    const video = await this.videoRepository.listVideos({ url: data.url });

    if (video.length > 0) {
      throw new UnprocessableEntityError(`There's already a video with this url`);
    }

    return await this.videoRepository.create(data);
  }
}
