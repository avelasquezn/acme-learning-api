import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../domain/model/aggregates/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async persist(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: { address: email } });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }
}
