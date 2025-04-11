import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class DailyProceduresQueryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  doctorId: string;

  @IsDateString()
  @ApiProperty()
  procedureDate: string;
}
