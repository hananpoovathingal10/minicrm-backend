import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class LeadsService {
  private leads: any[] = [];
  private idCounter = 1;

  constructor(private readonly customersService: CustomersService) {}

  create(data: any) {
    const lead = {
      id: this.idCounter++,
      ...data,
      status: 'NEW',
    };

    this.leads.push(lead);

    return lead;
  }

  findAll() {
    return this.leads;
  }

  findOne(id: number) {
    return this.leads.find((l) => l.id === id) || null;
  }

  update(id: number, data: any) {
    const index = this.leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return null;
    }

    const oldStatus = this.leads[index].status;
    const updatedLead = {
      ...this.leads[index],
      ...data,
    };

    if (data.status) {
      updatedLead.status = data.status.toUpperCase();
    }

    this.leads[index] = updatedLead;

    if (updatedLead.status === 'CONVERTED' && oldStatus !== 'CONVERTED') {
      this.customersService.create({
        name: updatedLead.name,
        email: updatedLead.email,
        phone: updatedLead.phone || '',
        company: updatedLead.company || '',
      });
    }

    return updatedLead;
  }

  remove(id: number) {
    const index = this.leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return null;
    }

    const deleted = this.leads[index];
    this.leads.splice(index, 1);

    return deleted;
  }

  updateStatus(id: number, status: string) {
    const lead = this.leads.find((l) => l.id === id);

    if (!lead) {
      return null;
    }

    const oldStatus = lead.status;
    const upperStatus = status.toUpperCase();
    lead.status = upperStatus;

    if (upperStatus === 'CONVERTED' && oldStatus !== 'CONVERTED') {
      this.customersService.create({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        company: lead.company || '',
      });
    }

    return lead;
  }

  convertToCustomer(id: number) {
    const lead = this.leads.find((l) => l.id === id);

    if (!lead) {
      return null;
    }

    const oldStatus = lead.status;
    lead.status = 'CONVERTED';

    if (oldStatus !== 'CONVERTED') {
      this.customersService.create({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        company: lead.company || '',
      });
    }

    return {
      message: 'Lead converted successfully',
      lead,
    };
  }
}