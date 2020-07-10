import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import User from '../../entities/User';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public create(@Body() data: Record<string, unknown>): Promise<User> {
    return this.userService.createUser(data);
  }
}
