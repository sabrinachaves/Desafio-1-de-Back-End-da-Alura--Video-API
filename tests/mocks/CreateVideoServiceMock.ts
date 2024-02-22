import { IVideo } from '../../src/domain/schemas/Video';
import ICreateVideoService from '../../src/service/CreateVideo/ICreateVideoService';

export default class CreateVideoServiceMock implements ICreateVideoService {
  public async handle(_data: IVideo): Promise<IVideo> {
    return {} as IVideo;
  }
}
