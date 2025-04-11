import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Procedure } from 'src/modules/procedures/entities/procedure.entity';
import { ProcedureEntityToModelMapper } from './mappers/procedure-entity-to-model.mapper';

@Injectable()
export class ProcedureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(procedure: Procedure): Promise<void> {
    const data = ProcedureEntityToModelMapper.map(procedure);

    await this.prismaService.procedure.create({
      data,
    });
  }
}
