import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { DoctorModelToEntityMapper } from './mappers/doctor-model-to-entity.mapper';

@Injectable()
export class DoctorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const doctorModel = await this.prismaService.doctor.findUnique({
      where: { id },
    });

    if (!doctorModel) {
      return null;
    }

    return DoctorModelToEntityMapper.map(doctorModel);
  }
}
