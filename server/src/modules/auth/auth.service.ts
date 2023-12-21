import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { LoginOptions } from './enums';

type SaveTokens = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  payload?: any;
};

type ThirdPartyUser = {
  username: string;
  userId: string;
  thirdPartyService: LoginOptions;
  payload?: any;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async login(user: IUserEntity) {
    const { accessToken, refreshToken } = this.getTokenPair({
      userId: user.id,
      username: user.username,
    });

    await this.saveTokens({
      userId: user.id,
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async thirdPartyLogin(user: ThirdPartyUser) {
    const { accessToken, refreshToken } = this.getTokenPair({
      userId: user.userId,
      username: user.username,
    });

    await this.saveTokens({
      userId: user.userId,
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsernameWithPassword(username);

    if (!user) {
      throw new BadRequestException('username or password is incorrect');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...currentUser } = user;

      return currentUser;
    }

    throw new BadRequestException('username or password is incorrect');
  }

  async saveTokens({ userId, accessToken, refreshToken, payload }: SaveTokens) {
    const hashedAccessToken = await this.hashToken(accessToken);
    const hashedRefreshToken = await this.hashToken(refreshToken);

    await this.tokenRepository.save({
      userId,
      hashedAccessToken,
      hashedRefreshToken,
      payload,
    });
  }

  getTokenPair({ userId, username }) {
    const tokenPayload = {
      username,
      sub: userId,
    };
    const accessToken = this.jwtService.sign(tokenPayload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async hashToken(token: string): Promise<string> {
    return await bcrypt.hash(token, 10);
  }
}
