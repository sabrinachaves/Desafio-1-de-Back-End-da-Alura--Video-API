import DatabaseFactory from '@infrastructure/factories/persistence/DatabaseFactory';

async () => {
  const database = await DatabaseFactory.make();
  await database.connect();
};
