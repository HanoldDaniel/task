import { Module } from '@nestjs/common';
import { AlertsModule } from './alerts/alerts.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AlertsModule, PrismaModule],
})
export class AppModule {}
