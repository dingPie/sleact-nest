import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway], // 다른 모듈에서 사용할 수 있도록 export
})
export class EventsModule {}
