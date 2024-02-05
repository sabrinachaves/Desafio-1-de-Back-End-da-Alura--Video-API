import { IVideo } from '@domain/schemas/Video';
import IVideoRepository from './IVideoRepository';
import { Model } from 'mongoose';

export default class VideoRepository implements IVideoRepository {
  constructor(protected videoModel: Model<IVideo>) {}

  async create(video: IVideo): Promise<IVideo> {
    try {
      return await this.videoModel.create(video);
    } catch (err: any) {
      throw err;
    }
  }
}
