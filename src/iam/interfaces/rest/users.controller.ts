import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserCommandService } from '../../application/internal/services/user-command.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/v1/users')
export class UsersController {
  @Inject()
  private readonly userCommandService: UserCommandService;

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userCommandService.createUser(dto);
  }
}
