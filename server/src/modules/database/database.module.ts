import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<any>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('POSTGRES_DB'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          synchronize: configService.get<boolean>('TYPEORM_SYNC'),
          keepConnectionAlive: configService.get<boolean>(
            'DB_KEEP_CONNECTION_ALIVE',
          ),
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
