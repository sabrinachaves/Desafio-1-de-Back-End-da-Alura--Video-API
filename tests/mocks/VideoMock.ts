import { faker } from '@faker-js/faker';
import { IVideo } from '../../src/domain/schemas/Video';

export const videoMock: IVideo = {
  _id: faker.datatype.uuid(),
  url: faker.internet.url(),
  description: faker.random.words(4),
  title: 'Video Mock 1',
};
