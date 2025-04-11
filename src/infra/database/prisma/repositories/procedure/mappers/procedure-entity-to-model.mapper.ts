import { Procedure } from 'src/modules/procedures/entities/procedure.entity';

export class ProcedureEntityToModelMapper {
  public static map({
    id,
    doctorId,
    pacientId,
    procedureDate,
    amount,
    paymentStatus,
  }: Procedure) {
    const data = {
      id,
      doctorId,
      pacientId,
      procedureDate,
      amount,
      paymentStatus,
    };

    return data;
  }
}
