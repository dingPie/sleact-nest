import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { DmsModule } from './dms/dms.module';
import { ChannelsService } from './channels/channels.service';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsModule } from './channels/channels.module';
import { WorkspacesService } from './workspaces/workspaces.service';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { WorkspacesModule } from './workspaces/workspaces.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DmsModule,
    ChannelsModule,
    WorkspacesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [], // __dirname + '/**/*.entity{.ts,.js}'
      // 이거 처음에만 true 이후에는 false
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, ChannelsController, WorkspacesController],
  providers: [AppService, ConfigService, ChannelsService, WorkspacesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
