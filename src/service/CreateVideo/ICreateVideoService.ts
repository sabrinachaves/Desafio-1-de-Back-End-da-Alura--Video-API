import { IVideo } from '@domain/schemas/Video';

export default interface ICreateVideoService {
  handle(video: IVideo): Promise<IVideo>;
}
