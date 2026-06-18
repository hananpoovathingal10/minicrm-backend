import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  private reports: any[] = [
    {
      id: 1,
      name: 'Monthly Sales Report',
      type: 'Sales',
      schedule: 'monthly',
      lastRun: '3/26/2026 5:04:53 PM',
      status: 'ACTIVE',
      createdBy: 'System Administrator',
    },
    {
      id: 2,
      name: 'Lead Conversion Analysis',
      type: 'Leads',
      schedule: 'weekly',
      lastRun: '12/22/2025 4:50:35 PM',
      status: 'ACTIVE',
      createdBy: 'System Administrator',
    },
    {
      id: 3,
      name: 'Activity Summary',
      type: 'Activities',
      schedule: 'weekly',
      lastRun: '3/26/2026 5:04:30 PM',
      status: 'ACTIVE',
      createdBy: 'System Administrator',
    },
    {
      id: 4,
      name: 'Quarterly Performance',
      type: 'Performance',
      schedule: 'quarterly',
      lastRun: '12/22/2025 4:50:44 PM',
      status: 'ACTIVE',
      createdBy: 'System Administrator',
    },
    {
      id: 5,
      name: 'New Contacts Report',
      type: 'Contacts',
      schedule: 'monthly',
      lastRun: '12/22/2025 4:50:41 PM',
      status: 'ACTIVE',
      createdBy: 'System Administrator',
    },
  ];
  private idCounter = 6;

  findAll() {
    return this.reports;
  }

  findOne(id: number) {
    return this.reports.find(r => r.id === id) || null;
  }

  create(data: any) {
    const report = {
      id: this.idCounter++,
      ...data,
      lastRun: new Date().toLocaleString(),
      status: data.status || 'ACTIVE',
      createdBy: data.createdBy || 'System Administrator',
    };
    this.reports.push(report);
    return report;
  }

  update(id: number, data: any) {
    const index = this.reports.findIndex(r => r.id === id);
    if (index === -1) {
      return null;
    }
    this.reports[index] = {
      ...this.reports[index],
      ...data,
    };
    return this.reports[index];
  }

  remove(id: number) {
    const index = this.reports.findIndex(r => r.id === id);
    if (index === -1) {
      return null;
    }
    const deleted = this.reports[index];
    this.reports.splice(index, 1);
    return deleted;
  }

  run(id: number) {
    const report = this.reports.find(r => r.id === id);
    if (!report) {
      return null;
    }
    report.lastRun = new Date().toLocaleString();
    return report;
  }
}
