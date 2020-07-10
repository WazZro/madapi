import { Provider } from '@nestjs/common';
import {
  DATABASE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PROVIDER_TOKEN,
  DATABASE_USERNAME, ENTITY_PATH,
} from '../../constants';
import { Sequelize } from 'sequelize-typescript';

export const DATABASE_PROVIDER: Provider = {
  provide: DATABASE_PROVIDER_TOKEN,
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: DATABASE_HOST,
      port: 32768,
      database: DATABASE,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      models: [ENTITY_PATH],
      modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
      },
    });

    console.log(ENTITY_PATH)
    await sequelize.sync();
    return sequelize;
  },
};
