import { IVideo } from '../../src/domain/schemas/Video';
import ICreateVideoDTO from '../../src/service/CreateVideo/interfaces/ICreateVideoDTO';
import ICreateVideoService from '../../src/service/CreateVideo/interfaces/ICreateVideoService';

export default class CreateVideoServiceMock implements ICreateVideoService {
  public async handle(_data: ICreateVideoDTO): Promise<IVideo> {
    return {} as IVideo;
  }
}
