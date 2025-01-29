import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    NotificationsModule
  ],
  controllers: [  ],
  providers: [  ],
})
export class AppModule {}
