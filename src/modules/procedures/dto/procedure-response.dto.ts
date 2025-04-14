import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../entities/procedure.entity';

export class ProcedureResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  doctorId: string;

  @ApiProperty({ format: 'uuid' })
  pacientId: string;

  @ApiProperty({ type: String, format: 'date-time' })
  procedureDate: Date;

  @ApiProperty({ example: 1000 })
  amount: number;

  @ApiProperty({ enum: PaymentStatus, example: 'DENIED' })
  paymentStatus: PaymentStatus;
}
