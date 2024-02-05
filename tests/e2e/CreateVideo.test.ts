import supertest from 'supertest';
import { CREATED } from 'http-status';

import { VIDEO_API_URL_TEST_ENVIRONMENT } from './constants';
import { videoSeed } from '../../development/seeds/seeds';
// import { faker } from '@faker-js/faker';

const request = () => supertest(`${VIDEO_API_URL_TEST_ENVIRONMENT}/video/v1`);

describe('POST /v1/video/', () => {
  it('should return 201 when video is successfully created', async () => {
    return new Promise((done) => {
      request()
        .post('/video')
        .send({
          title: videoSeed.title,
          description: videoSeed.description,
          url: videoSeed.url,
        })
        .expect(CREATED)
        .end((err, response) => {
          expect(err).toBeNull();
          expect(response.status).toBe(CREATED);
          expect(response.body.title).toBe(videoSeed.title);
          expect(response.body.url).toBe(videoSeed.url);
          expect(response.body.description).toBe(videoSeed.description);
          done(undefined);
        });
    });
  });

  // it('should return 201 when courtesy consumable is successfully created', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[0]);
  //   await axios.post('http://localhost:3002/seed', productMock[0]);

  //   const packageId = faker.datatype.uuid();

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         packageId,
  //         courtesy: true,
  //       })
  //       .expect(CREATED)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.status).toBe(CREATED);
  //         expect(response.body.billingItemId).toBeUndefined();
  //         expect(response.body.packageId).toBe(packageId);
  //         expect(response.body.userId).toBe(consumableSeed.userId);
  //         expect(response.body.companyId).toBeNull();
  //         expect(response.body.plan.id).toEqual(planMock[0].id);
  //         expect(response.body.availableQuantity).toEqual(planMock[0].amount);
  //         expect(response.body.originalQuantity).toEqual(planMock[0].amount);
  //         expect(response.body.status).toBe('AVAILABLE');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 201 when consumable is successfully created with HBU product', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[4]);
  //   await axios.post('http://localhost:3002/seed', productMock[2]);
  //   const billingItemId = faker.datatype.uuid();

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableHBUSeed.userId,
  //         companyId: consumableHBUSeed.companyId,
  //         plan: { id: planMock[4].id },
  //         billingItemId,
  //       })
  //       .expect(CREATED)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.status).toBe(CREATED);
  //         expect(response.body.billingItemId).toBe(billingItemId);
  //         expect(response.body.packageId).toBe(billingItemId);
  //         expect(response.body.userId).toBe(consumableHBUSeed.userId);
  //         expect(response.body.companyId).toBe(consumableHBUSeed.companyId);
  //         expect(response.body.plan.id).toEqual(planMock[4].id);
  //         expect(response.body.availableQuantity).toEqual(0);
  //         expect(response.body.originalQuantity).toEqual(planMock[4].amount);
  //         expect(response.body.status).toBe('PENDING');
  //         expect(response.body.hasIGPMReadjustment).toBeTruthy();
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 201 when consumable is successfully created with packageQuantity', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[0]);
  //   await axios.post('http://localhost:3002/seed', productMock[0]);
  //   const billingItemId = faker.datatype.uuid();

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         billingItemId,
  //         packageQuantity: 2,
  //       })
  //       .expect(CREATED)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.status).toBe(CREATED);
  //         expect(response.body.billingItemId).toBe(billingItemId);
  //         expect(response.body.packageId).toBe(billingItemId);
  //         expect(response.body.userId).toBe(consumableSeed.userId);
  //         expect(response.body.plan.id).toEqual(planMock[0].id);
  //         expect(response.body.availableQuantity).toEqual(0);
  //         expect(response.body.originalQuantity).toEqual(planMock[0].amount * 2);
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 201 when consumable is successfully created with expirationDate', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[0]);
  //   await axios.post('http://localhost:3002/seed', productMock[0]);
  //   const billingItemId = faker.datatype.uuid();

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         billingItemId,
  //         expirationDate: new Date().toISOString(),
  //       })
  //       .expect(CREATED)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.status).toBe(CREATED);
  //         expect(response.body.billingItemId).toBe(billingItemId);
  //         expect(response.body.userId).toBe(consumableSeed.userId);
  //         expect(response.body.plan.id).toEqual(planMock[0].id);
  //         expect(response.body.availableQuantity).toEqual(0);
  //         expect(response.body.originalQuantity).toEqual(planMock[0].amount);
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should respond 409 when trying to create a consumable with an existing billingItemId', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[0]);
  //   await axios.post('http://localhost:3002/seed', productMock[0]);

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         billingItemId: consumableSeed.billingItemId,
  //       })
  //       .expect(CONFLICT)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.status).toBe(CONFLICT);
  //         expect(response.body.error).toBe('The informed billingItemId already exists');
  //         done(undefined);
  //       });
  //   });
  // });
  // it('should return 400 when a field with a invalid type is sent', () => {
  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         billingItemId: consumableSeed.billingItemId,
  //         packageQuantity: 'test',
  //       })
  //       .expect(BAD_REQUEST)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('"packageQuantity" must be a number');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 400 when a courtesy with a invalid type is sent', () => {
  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         billingItemId: consumableSeed.billingItemId,
  //         packageQuantity: 1,
  //         courtesy: 'test',
  //       })
  //       .expect(BAD_REQUEST)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('"courtesy" must be [false]');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 400 when a courtesy and billingItemId is not sent', () => {
  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         packageQuantity: 1,
  //       })
  //       .expect(BAD_REQUEST)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('"courtesy" is required');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 400 when billingItemId is null and courtesy is false', () => {
  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         packageQuantity: 1,
  //         billingItemId: null,
  //         courtesy: false,
  //       })
  //       .expect(BAD_REQUEST)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('"courtesy" must be [true]');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 400 when billingItemId is not send and courtesy is false', () => {
  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         packageQuantity: 1,
  //         courtesy: false,
  //       })
  //       .expect(BAD_REQUEST)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('"courtesy" must be [true]');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should return 400 when billingItemId is send and courtesy is true', () => {
  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         packageQuantity: 1,
  //         billingItemId: faker.datatype.uuid(),
  //         courtesy: true,
  //       })
  //       .expect(BAD_REQUEST)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('"courtesy" must be [false]');
  //         done(undefined);
  //       });
  //   });
  // });

  // it('should create 404 when not found a valid plan', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[1]);

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[0].id },
  //         billingItemId: consumableSeed.billingItemId,
  //       })
  //       .expect(NOT_FOUND)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('Plan not found');
  //         done(undefined);
  //       });
  //   });
  // });
  // it('should return 422 when the product correlated with the plan is not available to aquisition', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[1]);
  //   await axios.post('http://localhost:3002/seed', productMock[1]);

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[1].id },
  //         billingItemId: consumableSeed.billingItemId,
  //       })
  //       .expect(UNPROCESSABLE_ENTITY)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('Product is not available to create a consumable');
  //         done(undefined);
  //       });
  //   });
  // });
  // it('should return 422 when plan is invalid to consumable', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[5]);

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[5].id },
  //         billingItemId: consumableSeed.billingItemId,
  //       })
  //       .expect(UNPROCESSABLE_ENTITY)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('Invalid plan for consumable');
  //         done(undefined);
  //       });
  //   });
  // });
  // it('should return 422 when the product business unit does not match user type', async () => {
  //   await axios.post('http://localhost:3001/seed', planMock[4]);
  //   await axios.post('http://localhost:3002/seed', productMock[2]);

  //   return new Promise((done) => {
  //     request()
  //       .post('/consumable')
  //       .send({
  //         userId: consumableSeed.userId,
  //         plan: { id: planMock[4].id },
  //         billingItemId: consumableSeed.billingItemId,
  //       })
  //       .expect(UNPROCESSABLE_ENTITY)
  //       .end((err, response) => {
  //         expect(err).toBeNull();
  //         expect(response.body.error).toBe('Product is only available for companies.');
  //         done(undefined);
  //       });
  //   });
  // });
});
