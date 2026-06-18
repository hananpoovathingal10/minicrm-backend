import { LeadsService } from './leads.service';
import { CustomersService } from '../customers/customers.service';

describe('LeadsService', () => {
  let service: LeadsService;

  beforeEach(() => {
    service = new LeadsService(new CustomersService());
  });

  it('should create lead', () => {
    const lead = service.create({
      name: 'John',
      email: 'john@mail.com',
    });

    expect(lead).toHaveProperty('id');
    expect(lead.name).toBe('John');
  });

  it('should return all leads', () => {
    service.create({ name: 'A', email: 'a@mail.com' });
    expect(service.findAll().length).toBe(1);
  });
});