import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProcedureRepository } from './prisma/repositories/procedure/procedure.repository';
import { DoctorRepository } from './prisma/repositories/doctor/doctor.repository';

@Global()
@Module({
  providers: [PrismaService, ProcedureRepository, DoctorRepository],
  exports: [PrismaService, ProcedureRepository, DoctorRepository],
})
export class DatabaseModule {}
