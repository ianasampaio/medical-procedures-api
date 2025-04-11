import {
  PaymentStatus,
  Procedure,
} from 'src/modules/procedures/entities/procedure.entity';
import { PaymentStatus as PrismaPaymentStatus } from '@prisma/client';

export class ProcedureModelToEntityMapper {
  public static map({
    id,
    doctorId,
    pacientId,
    procedureDate,
    amount,
    paymentStatus,
  }: {
    id: string;
    doctorId: string;
    pacientId: string;
    procedureDate: Date;
    amount: number;
    paymentStatus: PrismaPaymentStatus;
  }): Procedure {
    return {
      id,
      doctorId,
      pacientId,
      procedureDate,
      amount,
      paymentStatus: PaymentStatus[paymentStatus],
    };
  }
}
