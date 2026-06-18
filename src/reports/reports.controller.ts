import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const report = this.reportsService.findOne(+id);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  @Post()
  create(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateReportDto) {
    const result = this.reportsService.update(+id, body);
    if (!result) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.reportsService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return result;
  }

  @Post(':id/run')
  run(@Param('id') id: string) {
    const result = this.reportsService.run(+id);
    if (!result) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return result;
  }
}
