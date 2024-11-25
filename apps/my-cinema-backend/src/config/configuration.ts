import { Configuration } from './config.module';
import * as Joi from 'joi';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

const configSchemaValidation = Joi.object({
  TYPEORM_CONNECTION: Joi.string().valid('postgres').required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  RABBITMQ_URI: Joi.string().required(),
  RABBITMQ_QUEUE: Joi.string().required(),
  RABBITMQ_NOACK: Joi.boolean().required(),
  RABBITMQ_DURABLE: Joi.boolean().required(),
});

export const configuration = (
  overrideValues?: RecursivePartial<Configuration>,
) => {
  const result = configSchemaValidation.validate(process.env, {
    allowUnknown: true,
  });

  if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}`);
  }

  return {
    database: {
      type: overrideValues?.database?.type || result.value.TYPEORM_CONNECTION,
      host: overrideValues?.database?.host || result.value.TYPEORM_HOST,
      port: overrideValues?.database?.port || result.value.TYPEORM_PORT,
      username:
        overrideValues?.database?.username || result.value.TYPEORM_USERNAME,
      password:
        overrideValues?.database?.password || result.value.TYPEORM_PASSWORD,
      synchronize:
        overrideValues?.database?.synchronize ||
        process.env.TYPEORM_SYNCHRONIZE,
    },
  };
};

export const overrideConfiguration = (
  overrideValues: RecursivePartial<Configuration>,
) => {
  return () => configuration(overrideValues);
};
