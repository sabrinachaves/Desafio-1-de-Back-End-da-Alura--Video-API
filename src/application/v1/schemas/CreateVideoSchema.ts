import Joi from 'joi';

const createVideoSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
  url: Joi.string().required(),
});

export default createVideoSchema;
