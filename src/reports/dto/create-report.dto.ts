import { IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  schedule: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
