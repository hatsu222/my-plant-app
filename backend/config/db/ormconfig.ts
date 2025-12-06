import { DataSource } from 'typeorm';
import { User } from '../../src/user/user.entity';
import { Plant } from '../../src/plants/plant.entity';
import { Img } from '../../src/img/img.entity';

const databaseUrl =
  'postgresql://hatsu:tgLLT5SBM0IyokfkxMl56oFJuHDAcPsG@dpg-d4mmnsi4d50c73eq2j00-a.oregon-postgres.render.com/myplant_3zj4';

const dataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  synchronize: false, // trueの場合、起動時に自動的にDBと同期
  logging: true,
  entities: [User, Plant, Img],
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dataSource;
