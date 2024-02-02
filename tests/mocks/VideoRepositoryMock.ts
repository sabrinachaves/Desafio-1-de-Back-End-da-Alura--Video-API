import { IVideo } from '../../src/domain/schemas/Video';
import IVideoRepository from '../../src/domain/repositories/video/IVideoRepository';

export default class VideoRepositoryMock implements IVideoRepository {
  async create(video: IVideo): Promise<IVideo> {
    return video;
  }
}
