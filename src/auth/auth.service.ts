import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  register(registerDto: RegisterDto) {
    /**
     * Before registering user to the database, check these points
     * 1. Check if email already exits (User module)
     * 2. Hash the password then store in db (User module)
     * 3. Create user (user Module)
     * 4. return accessToken and refreshToken
     */

    const user = this.userService.getUserByEmail(registerDto.email);
    return user;
  }
}
