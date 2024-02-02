// eslint-disable-next-line max-len
import CreateVideoControllerFactory from '../../../../../src/infrastructure/factories/controller/CreateVideoControllerFactory';
import CreateVideoController from '../../../../../src/application/v1/controller/CreateVideoController';
import CreateVideoServiceMock from '../../../../mocks/CreateVideoServiceMock';

describe('CreateVideoControllerFactory', () => {
  it('should make the create video controller #unit', async () => {
    const controller = await CreateVideoControllerFactory.make(new CreateVideoServiceMock());

    expect(controller).toBeInstanceOf(CreateVideoController);
  });
});
