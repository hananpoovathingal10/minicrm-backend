import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly leadsService: LeadsService,
  ) {}

  getStats() {
    const customers = this.customersService.findAll();
    const leads = this.leadsService.findAll();

    const activeLeads = leads.filter(
      (l) => l.status !== 'CONVERTED'
    ).length;

    return {
      customers: customers.length,
      leads: activeLeads,
    };
  }
}
