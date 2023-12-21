import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  IBaseEntity,
} from 'src/modules/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

export interface IUserEntity extends IBaseEntity {
  username: string;
  password?: string;
}

@Entity({ name: 'user' })
@ObjectType()
export class UserEntity extends BaseEntity implements IUserEntity {
  @Field(() => String)
  @Column({ length: 200 })
  username: string;

  @Field(() => String)
  @Column({ length: 200, select: false })
  password: string;
}
