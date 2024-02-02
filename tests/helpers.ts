import supertest from 'supertest';
import { RequestHandler, Router, json } from 'express';

import App from '../src/application/App';
import { AppConfig } from '../src/config/AppConfig';
import { validateSchema } from '../src/application/v1/middlewares/ValidateSchema';
import ICreateVideoService from '../src/service/CreateVideo/interfaces/ICreateVideoService';
import CreateVideoServiceMock from './mocks/CreateVideoServiceMock';
import CreateVideoControllerFactory from '../src/infrastructure/factories/controller/CreateVideoControllerFactory';

interface MockServerOptions {
  createVideoService?: ICreateVideoService;
}

const routes = async (options: MockServerOptions): Promise<Router> => {
  const createVideoService = options.createVideoService ?? new CreateVideoServiceMock();

  const router = Router();

  router.post(
    '/v1/video',
    validateSchema('createVideo', 'body'),
    (await CreateVideoControllerFactory.make(createVideoService)).execute,
  );

  return router;
};

export const mockApp = async (options: MockServerOptions): Promise<App> => {
  const middlewares: RequestHandler[] = [];

  middlewares.push(json());

  const app = new App({
    port: AppConfig.PORT,
    routes: await routes(options),
    middlewares,
    environment: AppConfig.APP_ENVIRONMENT,
  });

  return app;
};

export const mockServer = async (options: MockServerOptions): Promise<supertest.SuperTest<supertest.Test>> => {
  const app = await mockApp(options);
  return supertest(app.app);
};
