import { IVideo } from '@domain/schemas/Video';

export default interface IVideoRepository {
  create(video: IVideo): Promise<IVideo>;
  getById(id: string): Promise<IVideo | null>;
  listVideos(filters?: IFilterVideo): Promise<IVideo[]>;
}

export interface IFilterVideo {
  url?: string;
  title?: string;
}
