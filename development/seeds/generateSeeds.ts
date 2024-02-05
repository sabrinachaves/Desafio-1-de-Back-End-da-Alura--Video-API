import mongoose from 'mongoose';

import { Video } from '../../src/domain/schemas/Video';
import { videoSeeds } from '../../development/seeds/seeds';
import { AppConfig } from '../../src/config/AppConfig';

(async () => {
  await mongoose.connect(AppConfig.MONGO_URI, {
    dbName: AppConfig.MONGO_DB_NAME,
  });
  const videoModel = mongoose.model('Video', Video);

  if ((await videoModel.find()).length === 0) await videoModel.create(videoSeeds);
})()
  .then(async () => {
    await mongoose.disconnect();
    process.exit();
  })
  .catch((err) => console.log(err));
