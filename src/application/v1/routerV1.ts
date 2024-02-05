import CreateVideoControllerFactory from '@infrastructure/factories/controller/CreateVideoControllerFactory';
import { Router } from 'express';
import { validateSchema } from './middlewares/ValidateSchema';
import PingControllerFactory from '@infrastructure/factories/controller/PingControllerFactory';

const routerV1 = Router();

(async () => {
  routerV1.get('/ping', PingControllerFactory.make().execute);
  routerV1.post('/video', validateSchema('createVideo', 'body'), (await CreateVideoControllerFactory.make()).execute);
})();

export default routerV1;
