import routes from './application/routes';
import AppFactory from './infrastructure/factories/AppFactory';
import DatabaseFactory from './infrastructure/factories/persistence/DatabaseFactory';

(async () => {
  const database = await DatabaseFactory.make();
  await database.connect();
  const app = await AppFactory.make(routes);
  await app.listen();
})();
