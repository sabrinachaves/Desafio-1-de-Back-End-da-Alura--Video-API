import { IVideo } from '@domain/schemas/Video';
import IVideoRepository from './IVideoRepository';
import { Model } from 'mongoose';

export default class VideoRepository implements IVideoRepository {
  constructor(protected videoModel: Model<IVideo>) {}

  async create(video: IVideo): Promise<IVideo> {
    try {
      const createdVideo = await this.videoModel.create(video);
      return createdVideo;
    } catch (err: any) {
      throw err;
    }
  }
}
