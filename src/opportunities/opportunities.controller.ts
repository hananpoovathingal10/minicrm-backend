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
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const opp = this.opportunitiesService.findOne(+id);
    if (!opp) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return opp;
  }

  @Post()
  create(@Body() body: CreateOpportunityDto) {
    return this.opportunitiesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateOpportunityDto) {
    const result = this.opportunitiesService.update(+id, body);
    if (!result) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.opportunitiesService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return result;
  }
}
