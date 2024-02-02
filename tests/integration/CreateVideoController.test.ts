//eslint-disable-next-line
import CreateVideoServiceFactory from '../../src/infrastructure/factories/services/CreateVideoServiceFactory';
import supertest from 'supertest';
import { BAD_REQUEST, CREATED } from 'http-status';
import { mockServer } from '../helpers';
import VideoRepositoryMock from '../mocks/VideoRepositoryMock';
import { videoMock } from '../mocks/VideoMock';

describe('CreateVideoController', () => {
  let server: supertest.SuperTest<supertest.Test>;
  let videoRepositoryMock = new VideoRepositoryMock();

  beforeAll(async () => {
    server = await mockServer({
      createVideoService: await CreateVideoServiceFactory.make(videoRepositoryMock),
    });
  });

  it('should return 201 CREATED #integration', async () => {
    return new Promise((done) => {
      server
        .post('/v1/video')
        .send({
          title: videoMock.title,
          description: videoMock.description,
          url: videoMock.url,
        })
        .expect(CREATED)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.title).toEqual(videoMock.title);
          expect(response.body.url).toEqual(videoMock.url);
          expect(response.body.description).toEqual(videoMock.description);
          done(undefined);
        });
    });
  });

  it('should return 201 CREATED without description #integration', async () => {
    return new Promise((done) => {
      server
        .post('/v1/video')
        .send({
          title: videoMock.title,
          url: videoMock.url,
        })
        .expect(CREATED)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.title).toEqual(videoMock.title);
          expect(response.body.url).toEqual(videoMock.url);
          done(undefined);
        });
    });
  });

  it('should return 400 when title is not sent', async () => {
    const response = await server
      .post('/v1/video')
      .send({
        description: videoMock.description,
        url: videoMock.url,
      })
      .expect(BAD_REQUEST);
    expect(response.status).toEqual(BAD_REQUEST);
    expect(response.body.error).toBe('"title" is required');
  });

  it('should return 400 when url is not sent', async () => {
    const response = await server
      .post('/v1/video')
      .send({
        description: videoMock.description,
        title: videoMock.title,
      })
      .expect(BAD_REQUEST);
    expect(response.status).toEqual(BAD_REQUEST);
    expect(response.body.error).toBe('"url" is required');
  });
});
