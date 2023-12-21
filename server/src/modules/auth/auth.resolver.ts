import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/input/login.input';
import { LoginOutput } from './dto/output/login.output';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { IUserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ThirdPartyLoginInput } from './dto/input/third-party-login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  async login(@Context() context) {
    const { accessToken, refreshToken } = await this.authService.login(
      context.user,
    );

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    return new BadRequestException('Wrong username or password');
  }

  @Mutation(() => LoginOutput)
  async thirdPartyLogin(
    @Args('ThirdPartyLoginInput') loginInput: ThirdPartyLoginInput,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.thirdPartyLogin(loginInput);

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    return new BadRequestException('Something went wrong');
  }

  @Query(() => LoginOutput)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context() context) {
    const userId = context.req.user.userId;
    const username = context.req.user.username;
    const { accessToken, refreshToken } = await this.authService.login({
      username,
      userId,
    } as unknown as IUserEntity);

    return {
      accessToken,
      refreshToken,
    };
  }
}
