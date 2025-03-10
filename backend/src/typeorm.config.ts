import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Tanu0130',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // 本番環境ではfalseにするべきです
};
