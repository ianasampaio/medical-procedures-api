import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class DeniedProceduresQueryDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '2025-04-01T00:00:00Z',
  })
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '2025-04-20T23:59:59Z',
  })
  endDate: string;
}
