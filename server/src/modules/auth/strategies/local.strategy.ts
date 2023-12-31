import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = this.authService.validateUser(username, password);

    if (user) {
      return user;
    }

    throw new NotFoundException('Incorrect email or password');
  }
}
