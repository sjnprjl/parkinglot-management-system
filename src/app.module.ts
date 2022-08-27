import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ParkingTypeModule } from './parking-type/parking-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [`${__dirname}/**/*{.ts,.js}`],
        synchronize: true,
        database: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        username: configService.get('DB_USERNAME'),
        port: +configService.get('DB_PORT'),
      }),
    }),
    LocationModule,
    ParkingLotModule,
    ParkingTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
