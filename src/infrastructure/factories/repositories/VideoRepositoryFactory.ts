import IVideoRepository from '@domain/repositories/video/IVideoRepository';
import VideoRepository from '@domain/repositories/video/VideoRepository';
import { IVideo, Video } from '@domain/schemas/Video';
import { Model, model } from 'mongoose';

export default class VideoRepositoryFactory {
  private static repository: IVideoRepository;

  static async make(): Promise<IVideoRepository> {
    const videoModel: Model<IVideo> = model<IVideo>('Video', Video);

    if (this.repository) {
      return this.repository;
    }

    this.repository = new VideoRepository(videoModel);
    return this.repository;
  }
}
