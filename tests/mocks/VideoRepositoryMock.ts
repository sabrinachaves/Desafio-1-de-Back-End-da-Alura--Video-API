import { IVideo } from '../../src/domain/schemas/Video';
import IVideoRepository, { IFilterVideo } from '../../src/domain/repositories/video/IVideoRepository';

export default class VideoRepositoryMock implements IVideoRepository {
  async create(video: IVideo): Promise<IVideo> {
    return video;
  }

  public async getById(_id: string): Promise<IVideo> {
    return {} as IVideo;
  }

  public async listVideos(_filters: IFilterVideo): Promise<IVideo[]> {
    return [] as IVideo[];
  }
}
