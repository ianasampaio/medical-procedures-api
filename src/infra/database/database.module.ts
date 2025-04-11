import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProcedureRepository } from './prisma/repositories/procedure/procedure.repository';

@Global()
@Module({
  providers: [PrismaService, ProcedureRepository],
  exports: [PrismaService, ProcedureRepository],
})
export class DatabaseModule {}
