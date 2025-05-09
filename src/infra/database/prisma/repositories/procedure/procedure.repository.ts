import { Injectable } from '@nestjs/common';
import {
  PaymentStatus,
  Procedure,
} from 'src/modules/procedures/entities/procedure.entity';
import { PrismaService } from '../../prisma.service';
import { ProcedureEntityToModelMapper } from './mappers/procedure-entity-to-model.mapper';
import { ProcedureModelToEntityMapper } from './mappers/procedure-model-to-entity.mapper';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class ProcedureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(procedure: Procedure): Promise<void> {
    const data = ProcedureEntityToModelMapper.map(procedure);

    await this.prismaService.procedure.create({
      data,
    });
  }

  public async findDailyProceduresByDoctor(
    doctorId: string,
    procedureDate: string,
  ): Promise<Procedure[]> {
    const date = new Date(procedureDate);

    const dailyProcedures = await this.prismaService.procedure.findMany({
      where: {
        doctorId,
        procedureDate: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    });

    const entities = dailyProcedures.map((dailyProcedure) =>
      ProcedureModelToEntityMapper.map(dailyProcedure),
    );

    return entities;
  }

  public async findDeniedProcedures(
    startDate: string,
    endDate: string,
  ): Promise<Procedure[]> {
    const deniedProcedures = await this.prismaService.procedure.findMany({
      where: {
        paymentStatus: PaymentStatus.DENIED,
        procedureDate: {
          gte: startOfDay(new Date(startDate)),
          lte: endOfDay(new Date(endDate)),
        },
      },
    });

    const entities = deniedProcedures.map((deniedProcedure) =>
      ProcedureModelToEntityMapper.map(deniedProcedure),
    );

    return entities;
  }

  public async findProceduresByDoctor(doctorId: string): Promise<Procedure[]> {
    const procedures = await this.prismaService.procedure.findMany({
      where: {
        doctorId,
      },
    });

    const entities = procedures.map((procedure) =>
      ProcedureModelToEntityMapper.map(procedure),
    );

    return entities;
  }
}
