import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/logint.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    /**
     * 1. Check email already exists?
     * 2. Hash the password
     * 3. Create user
     * 4. Generate JWT token
     * 5. Return the token
     */
    // Todo: Handle prisma transaction
    const existingUser = await this.userService.getUserByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already taken');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const user = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    this.logger.log(`New user has been created: ${user.id}`);

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      ...user,
      tokens: {
        accessToken,
      },
    };
  }

  async login(loginDto: LoginDto) {
    /**
     * 1. Get the user from db
     * 2. Match the password with hashed password
     * 3. Create JWT token
     * 4. Return user and JWT token
     */

    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException(`Email or password is invalid!`);
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(`Email or password is invalid!`);
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      tokens: {
        accessToken,
      },
    };
  }
}
