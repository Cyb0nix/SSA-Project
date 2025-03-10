import { Module } from '@nestjs/common';
import { InvestmentsModule } from './investments/investments.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    InvestmentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
