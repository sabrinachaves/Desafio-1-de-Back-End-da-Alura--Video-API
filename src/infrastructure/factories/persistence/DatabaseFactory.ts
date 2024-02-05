import { AppConfig } from '@config/AppConfig';
import Database from '@infrastructure/persistence/Database';
import { IDatabase } from '@infrastructure/persistence/IDatabase';
import { ConnectOptions } from 'mongoose';

export default class DatabaseFactory {
  private static database: IDatabase;

  static async make() {
    if (this.database) {
      return this.database;
    }

    let options: ConnectOptions = {
      appName: AppConfig.APPLICATION_NAME,
      dbName: AppConfig.MONGO_DB_NAME,
      replicaSet: 'rs0',
      readPreference: 'secondaryPreferred',
      retryWrites: false,
    };

    if (AppConfig.APP_ENVIRONMENT !== 'development') {
      options = {
        ...options,
        user: AppConfig.MONGO_USER,
        pass: AppConfig.MONGO_PASSWORD,
      };
    }

    this.database = new Database(AppConfig.MONGO_URI, options);

    return this.database;
  }
}
