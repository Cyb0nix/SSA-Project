import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsService } from './notifications/notifications.service';

@Module({
  imports: [NotificationsModule],
  controllers: [AppController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
