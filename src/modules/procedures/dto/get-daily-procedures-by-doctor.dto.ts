import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class DailyProceduresQueryDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    format: 'uuid',
    example: 'b0494b58-9d73-4b10-a6ab-338def097778',
  })
  doctorId: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '2025-04-10T23:59:59Z' })
  procedureDate: string;
}
