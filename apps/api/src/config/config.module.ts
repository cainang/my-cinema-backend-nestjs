import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { join } from 'path';
import { configuration } from './configuration';

export type Configuration = {
  database: {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    synchronize: boolean;
  };
  rabbitmq: {
    uri: string;
    queue: string;
    noack: boolean;
    durable: boolean;
  };
};

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    const { envFilePath, ...otherOptions } = options;

    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath! : [envFilePath!]),
        join(__dirname, `../../.env.${process.env.NODE_ENV}`),
        join(__dirname, '../../.env'),
      ],
      // validationSchema: Joi.object({
      //   TYPEORM_CONNECTION: Joi.string().valid('mysql').required(),
      //   TYPEORM_HOST: Joi.string().required(),
      //   TYPEORM_PORT: Joi.number().required(),
      //   TYPEORM_USERNAME: Joi.string().required(),
      //   TYPEORM_PASSWORD: Joi.string().required(),
      //   TYPEORM_DATABASE: Joi.string().required(),
      //   TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
      //   REDIS_DSN: Joi.string().required(),
      // }),
      load: [configuration],
      ...otherOptions,
    });
  }
}
