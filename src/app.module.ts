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

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DmsModule,
    ChannelsModule,
    WorkspacesModule,
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
