import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from 'src/infra/database/prisma/repositories/procedure/procedure.repository';
import { UUIDGenerator } from 'src/shared/uuid-generator';
import { CreateProcedureDto } from './dto/create-procedure.dto';

@Injectable()
export class ProceduresService {
  constructor(private readonly procedureRepository: ProcedureRepository) {}

  public async create(createProcedureDto: CreateProcedureDto) {
    const now = new Date();

    await this.procedureRepository.create({
      id: UUIDGenerator.generate(),
      doctorId: createProcedureDto.doctorId,
      pacientId: createProcedureDto.pacientId,
      amount: createProcedureDto.amount,
      paymentStatus: createProcedureDto.paymentStatus,
      procedureDate: now,
    });
  }
}
