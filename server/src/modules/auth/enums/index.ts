import { registerEnumType } from '@nestjs/graphql';

export enum LoginOptions {
  Google = 'google',
}

registerEnumType(LoginOptions, {
  name: 'LoginOptions',
});
