export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  DISPUTED = 'DISPUTED',
}

export class Procedure {
  id: string;
  doctorId: string;
  pacientId: string;
  procedureDate: Date;
  amount: number;
  paymentStatus: PaymentStatus;
}
