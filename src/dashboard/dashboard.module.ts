import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CustomersModule } from '../customers/customers.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [CustomersModule, LeadsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
