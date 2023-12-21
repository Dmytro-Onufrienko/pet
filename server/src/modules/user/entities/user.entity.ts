import { Field, ObjectType } from '@nestjs/graphql';
import { LoginOptions } from 'src/modules/auth/enums';
import {
  BaseEntity,
  IBaseEntity,
} from 'src/modules/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

export interface IUserEntity extends IBaseEntity {
  username: string;
  password?: string;
  thirdPartyService?: LoginOptions;
  thirdPartyId?: string;
  email: string;
}

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUserEntity {
  @Column({ length: 200 })
  username: string;

  @Column({ length: 200, select: false })
  password?: string;

  @Column({ nullable: true })
  thirdPartyId?: string;

  @Column({ length: 100, unique: true })
  email: string;
}
