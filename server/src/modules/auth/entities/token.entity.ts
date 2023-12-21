import {
  BaseEntity,
  IBaseEntity,
} from 'src/modules/database/entities/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LoginOptions } from '../enums';

export interface ITokenEntity extends IBaseEntity {
  userId: string;
  hashedAccessToken: string;
  hashedRefreshToken: string;
  loggedVia: LoginOptions;
  payload?: any;
}

@Entity({ name: 'token' })
export class TokenEntity extends BaseEntity implements ITokenEntity {
  @Column()
  @ManyToOne((_type) => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ length: 500 })
  hashedAccessToken: string;

  @Column({ length: 500 })
  hashedRefreshToken: string;

  @Column()
  loggedVia: LoginOptions;

  @Column()
  payload: string;
}
