import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from 'src/infra/database/prisma/repositories/procedure/procedure.repository';
import { UUIDGenerator } from 'src/shared/uuid-generator';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { ProceduresByDoctorQueryDto } from './dto/get-procedures-by-doctor.dto';
import { DeniedProceduresQueryDto } from './dto/get-denied-procedures-by-date.dto';
import { PaymentStatus } from './entities/procedure.entity';
import { validateDates } from 'src/shared/validate-dates';

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

  public async getDailyProceduresByDoctor(
    proceduresByDoctorQueryDto: ProceduresByDoctorQueryDto,
  ) {
    const { doctorId } = proceduresByDoctorQueryDto;

    return this.procedureRepository.findDailyProceduresByDoctor(doctorId);
  }

  public async getDeniedProcedures(
    deniedProceduresQueryDto: DeniedProceduresQueryDto,
  ) {
    const { startDate, endDate } = deniedProceduresQueryDto;

    validateDates(startDate, endDate);

    return this.procedureRepository.findDeniedProcedures(startDate, endDate);
  }

  async getFinancialReportByDoctor(
    proceduresByDoctorQueryDto: ProceduresByDoctorQueryDto,
  ) {
    const { doctorId } = proceduresByDoctorQueryDto;

    const procedures =
      await this.procedureRepository.findProceduresByDoctor(doctorId);

    const totalPaid = procedures
      .filter((procedure) => procedure.paymentStatus === PaymentStatus.PAID)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalPending = procedures
      .filter((procedure) => procedure.paymentStatus === PaymentStatus.PENDING)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalDenied = procedures
      .filter((procedure) => procedure.paymentStatus === PaymentStatus.DENIED)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return { totalPaid, totalPending, totalDenied, procedures };
  }
}
