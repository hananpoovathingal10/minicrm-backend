import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  private customers: any[] = [];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    return this.customers.find(c => c.id === id) || null;
  }

  create(customer: any) {
    customer.id = this.customers.length + 1;
    customer.status = customer.status || 'Active';
    customer.tier = customer.tier || 'Standard';
    this.customers.push(customer);
    return customer;
  }

  update(id: number, customer: any) {
    const index = this.customers.findIndex(c => c.id === id);

    if (index === -1) {
      return { message: 'Customer not found' };
    }

    this.customers[index] = {
      ...this.customers[index],
      ...customer,
    };

    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex(c => c.id === id);

    if (index === -1) {
      return { message: 'Customer not found' };
    }

    const deleted = this.customers[index];
    this.customers.splice(index, 1);

    return deleted;
  }
}