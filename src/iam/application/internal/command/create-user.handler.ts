import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../domain/model/commands/create-user.command';
import { User } from '../../../domain/model/aggregates/user.entity';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: UserRepository,
    private publisher: EventPublisher,
  ) {}
  async execute(command: CreateUserCommand) {
    const { username, email, password } = command;
    let user = new User();
    user.username = username;
    user.email.address = email;
    user.password = password;
    user = this.publisher.mergeObjectContext(
      await this.repository.persist(user),
    );
    user.onCreation();
    user.commit();
  }
}
