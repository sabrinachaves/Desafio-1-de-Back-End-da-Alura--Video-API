import Joi from 'joi';

const videoIdSchema = Joi.object().keys({
  id: Joi.string().uuid(),
});

export default videoIdSchema;
