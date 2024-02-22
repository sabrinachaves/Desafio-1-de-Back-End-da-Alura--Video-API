import { IVideo } from '@domain/schemas/Video';
import IVideoRepository, { IFilterVideo } from './IVideoRepository';
import { FilterQuery, Model } from 'mongoose';

export default class VideoRepository implements IVideoRepository {
  constructor(protected videoModel: Model<IVideo>) {}

  async create(video: IVideo): Promise<IVideo> {
    try {
      return await this.videoModel.create(video);
    } catch (err: any) {
      throw err;
    }
  }

  async getById(id: string): Promise<IVideo | null> {
    try {
      return await this.videoModel.findById(id);
    } catch (err: any) {
      throw err;
    }
  }

  async listVideos(filters?: IFilterVideo): Promise<IVideo[]> {
    const where = this.buildQueryFilter(filters);

    return await this.videoModel.find(where);
  }

  private buildQueryFilter(filters?: IFilterVideo): FilterQuery<IVideo> {
    let where = {};

    if (filters?.title) where = { ...where, title: filters.title };
    if (filters?.url) where = { ...where, url: filters.url };

    return where;
  }
}
