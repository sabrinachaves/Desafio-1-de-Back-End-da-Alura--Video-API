import ICreateVideoService from '@service/CreateVideo/interfaces/ICreateVideoService';
import CreateVideoController from 'src/application/v1/controller/CreateVideoController';
import CreateVideoServiceFactory from '../services/CreateVideoServiceFactory';

export default class CreateVideoControllerFactory {
  private static createVideoController: CreateVideoController;

  static async make(createVideoService?: ICreateVideoService): Promise<CreateVideoController> {
    if (this.createVideoController) {
      return this.createVideoController;
    }

    this.createVideoController = new CreateVideoController(
      createVideoService || (await CreateVideoServiceFactory.make()),
    );
    return this.createVideoController;
  }
}
