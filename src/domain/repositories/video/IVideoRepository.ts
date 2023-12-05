import { IVideo } from '@domain/schemas/Video';

export default interface IVideoRepository {
  create(video: IVideo): Promise<IVideo>;
}
