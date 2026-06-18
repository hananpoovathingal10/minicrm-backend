# Mini CRM Backend

## Tech Stack
- NestJS
- TypeScript

## Features
- Authentication (Login/Register)
- Leads Management
- Customers Management
- Lead → Customer Conversion
- Validation using DTO

## API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Leads
- POST /leads
- GET /leads
- POST /leads/:id/convert

### Customers
- POST /customers
- GET /customers

## How to Run

```bash
npm install
npm run start:dev