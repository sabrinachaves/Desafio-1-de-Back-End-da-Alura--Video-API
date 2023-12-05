import CreateVideoControllerFactory from '@infrastructure/factories/controller/CreateVideoControllerFactory';
import { Router } from 'express';
import { validateSchema } from './middlewares/ValidateSchema';

const routerV1 = Router();

(async () => {
  routerV1.post('/video', validateSchema('createVideo', 'body'), (await CreateVideoControllerFactory.make()).execute);
})();

export default routerV1;
