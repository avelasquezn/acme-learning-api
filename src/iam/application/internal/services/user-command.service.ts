import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../../../interfaces/rest/dto/create-user.dto';
import { CreateUserCommand } from '../../../domain/model/commands/create-user.command';

@Injectable()
export class UserCommandService {
  constructor(private commandBus: CommandBus) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }
}
