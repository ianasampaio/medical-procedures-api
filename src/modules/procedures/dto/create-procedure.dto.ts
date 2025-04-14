import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { PaymentStatus } from '../entities/procedure.entity';

export class CreateProcedureDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    format: 'uuid',
    example: 'b0494b58-9d73-4b10-a6ab-338def097778',
  })
  doctorId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    format: 'uuid',
    example: '322ac7b9-0355-45d8-8821-fef9b05b0049',
  })
  pacientId: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1000 })
  amount: number;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;
}
