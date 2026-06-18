import { IsString, IsNumber, IsIn } from 'class-validator';

export class CreateOpportunityDto {
  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsNumber()
  value: number;

  @IsString()
  @IsIn(['Qualification', 'Proposal', 'Negotiation', 'Won', 'Lost'])
  stage: string;

  @IsString()
  closeDate: string;
}
