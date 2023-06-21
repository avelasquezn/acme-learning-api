import { DataSource } from 'typeorm';
import { User } from '../model/aggregates/user.entity';

export const userRepositoryProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
