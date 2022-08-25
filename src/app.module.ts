import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [`${__dirname}/**/*{.ts,.js}`],
      synchronize: true,
      database: 'plms_db',
      password: 'localhost',
      username: 'postgres',
      port: 5432,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
