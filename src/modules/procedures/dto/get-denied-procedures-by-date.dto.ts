import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DeniedProceduresQueryDto {
  @IsDateString()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @ApiProperty()
  endDate: string;
}
