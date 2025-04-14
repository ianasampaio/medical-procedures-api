import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ProcedureResponseDto } from './procedure-response.dto';

export class ProceduresByDoctorQueryDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: 'b0494b58-9d73-4b10-a6ab-338def097778',
  })
  doctorId: string;
}

export class ProceduresByDoctorResponseDto {
  @ApiProperty({ type: String, example: 'Dr. House' })
  doctor: string;

  @ApiProperty({ example: 500 })
  totalPaid: number;

  @ApiProperty({ example: 400 })
  totalPending: number;

  @ApiProperty({ example: 100 })
  totalDenied: number;

  @ApiProperty({ type: [ProcedureResponseDto] })
  procedures: ProcedureResponseDto[];
}
