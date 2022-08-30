import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ParkingSpotModule } from './parking-spot/parking-spot.module';
import { ParkingTypeModule } from './parking-type/parking-type.module';
import { BookingModule } from './booking/booking.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    ParkingSpotModule,
    ParkingTypeModule,
    BookingModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
