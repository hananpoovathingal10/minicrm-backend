import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Patch,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // Public endpoint — no auth required. Anyone can submit interest form.
  @Post('public-capture')
  @HttpCode(HttpStatus.CREATED)
  publicCapture(@Body() body: any) {
    return this.leadsService.create({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      source: 'Interest Form',
      message: body.message || '',
      interest: body.interest || '',
      status: 'NEW',
      value: 0,
    });
  }

  @Post()
  create(@Body() body: CreateLeadDto) {
    return this.leadsService.create(body);
  }

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const lead = this.leadsService.findOne(+id);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateLeadDto) {
    const result = this.leadsService.update(+id, body);
    if (!result) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.leadsService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return result;
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const result = this.leadsService.updateStatus(+id, status);
    if (!result) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return result;
  }

  @Post(':id/convert')
  convert(@Param('id') id: string) {
    const result = this.leadsService.convertToCustomer(+id);
    if (!result) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return result;
  }
}