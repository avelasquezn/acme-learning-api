import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../domain/model/commands/create-user.command';
import { User } from '../../../domain/model/aggregates/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private publisher: EventPublisher) {}
  async execute(command: CreateUserCommand) {
    const { username, email, password } = command;
    let user = new User();
    user.username = username;
    user.email.address = email;
    user.password = password;
    // TODO: save new user
    user.onCreation();
    user.commit();
  }
}
