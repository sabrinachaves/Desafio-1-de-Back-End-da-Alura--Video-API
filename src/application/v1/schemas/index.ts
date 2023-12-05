import createVideoSchema from './CreateVideoSchema';
import videoIdSchema from './VideoIdSchema';

export default {
  videoId: videoIdSchema,
  createVideo: createVideoSchema,
};
