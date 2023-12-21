import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Any } from 'typeorm';
import { LoginOptions } from '../../enums';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class ThirdPartyLoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  userId: string;

  @Field(() => LoginOptions)
  thirdPartyService: LoginOptions;

  @Field(() => GraphQLJSONObject)
  payload: Record<string, any>;
}
