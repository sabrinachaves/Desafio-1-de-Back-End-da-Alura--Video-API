import mongoose from 'mongoose';

import Database from '../../../../src/infrastructure/persistence/Database';
import { AppConfig } from '../../../../src/config/AppConfig';

const mockRes = {
  on: jest.fn(),
};

jest.mock('mongoose', () => ({
  connect: jest.fn().mockImplementation(
    (_uri: any, _options: any) =>
      ({
        connection: mockRes,
      } as any),
  ),
}));

describe('Database', () => {
  let database: Database;

  const buildDatabase = () => {
    return new Database(AppConfig.MONGO_URI, {
      appName: AppConfig.APPLICATION_NAME,
      dbName: AppConfig.MONGO_DB_NAME,
      user: AppConfig.MONGO_USER,
      pass: AppConfig.MONGO_PASSWORD,
    });
  };

  beforeEach(() => {
    database = buildDatabase();
    jest.clearAllMocks();
  });

  it('should build database #unit', async () => {
    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('connect');
  });

  it('should connect to database #unit', async () => {
    const database = buildDatabase();
    const connectSpy = jest.spyOn(mongoose, 'connect');

    await database.connect();

    expect(connectSpy).toHaveBeenCalled();
  });

  it('should catch a error event #unit', async () => {
    const database = buildDatabase();

    mockRes.on.mockImplementation((event, cb: any) => {
      if (event === 'error') {
        cb();
      }
    });
    await expect(database.connect()).rejects.toThrow(new Error('Error on database connection'));

    expect(mockRes.on).toHaveBeenCalledWith('error', expect.any(Function));
  });

  it('should catch a disconnect event #unit', async () => {
    const database = buildDatabase();

    mockRes.on.mockImplementation((event, cb: any) => {
      if (event === 'disconnected') {
        cb();
      }
    });

    await expect(database.connect()).rejects.toThrow(new Error('Database disconnected'));

    expect(mockRes.on).toHaveBeenCalledWith('disconnected', expect.any(Function));
  });

  it('should get an error to connect to database #unit', async () => {
    const database = buildDatabase();
    const databaseSpy = jest.spyOn(mongoose, 'connect').mockImplementation(() => {
      return Promise.reject(new Error('database fail'));
    });

    await expect(database.connect()).rejects.toThrow(new Error('database fail'));
    expect(databaseSpy).toHaveBeenCalled();
  });
});
