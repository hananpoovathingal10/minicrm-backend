import { Injectable } from '@nestjs/common';

@Injectable()
export class OpportunitiesService {
  private opportunities: any[] = [
    {
      id: 1,
      title: 'Enterprise SaaS Deal',
      company: 'Acme Corp',
      value: 25000,
      stage: 'Proposal',
      closeDate: '2026-07-15',
    },
    {
      id: 2,
      title: 'Hardware Supply Contract',
      company: 'Global Inc',
      value: 85000,
      stage: 'Negotiation',
      closeDate: '2026-08-30',
    },
    {
      id: 3,
      title: 'Cloud Migration Project',
      company: 'Standard Tech',
      value: 12000,
      stage: 'Qualification',
      closeDate: '2026-06-30',
    },
    {
      id: 4,
      title: 'Consulting Agreement',
      company: 'Delta Ventures',
      value: 5000,
      stage: 'Won',
      closeDate: '2026-05-10',
    },
  ];
  private idCounter = 5;

  findAll() {
    return this.opportunities;
  }

  findOne(id: number) {
    return this.opportunities.find((o) => o.id === id) || null;
  }

  create(data: any) {
    const opp = {
      id: this.idCounter++,
      ...data,
      value: Number(data.value) || 0,
    };
    this.opportunities.push(opp);
    return opp;
  }

  update(id: number, data: any) {
    const index = this.opportunities.findIndex((o) => o.id === id);
    if (index === -1) {
      return null;
    }
    this.opportunities[index] = {
      ...this.opportunities[index],
      ...data,
      value: data.value !== undefined ? Number(data.value) : this.opportunities[index].value,
    };
    return this.opportunities[index];
  }

  remove(id: number) {
    const index = this.opportunities.findIndex((o) => o.id === id);
    if (index === -1) {
      return null;
    }
    const deleted = this.opportunities[index];
    this.opportunities.splice(index, 1);
    return deleted;
  }
}
