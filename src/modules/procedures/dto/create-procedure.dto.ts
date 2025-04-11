import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PaymentStatus } from '../entities/procedure.entity';

export class CreateProcedureDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pacientId: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;
}
