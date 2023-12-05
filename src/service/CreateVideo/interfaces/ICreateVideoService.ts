import { IVideo } from '@domain/schemas/Video';
import ICreateVideoDTO from './ICreateVideoDTO';

export default interface ICreateVideoService {
  handle(data: ICreateVideoDTO): Promise<IVideo>;
}
