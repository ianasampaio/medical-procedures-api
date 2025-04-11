import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { DoctorModelToEntityMapper } from './mappers/doctor-model-to-entity.mapper';
import { Doctor } from 'src/modules/procedures/entities/doctor.entity';

@Injectable()
export class DoctorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string): Promise<Doctor | null> {
    const doctorModel = await this.prismaService.doctor.findUnique({
      where: { id },
    });

    if (!doctorModel) {
      return null;
    }

    return DoctorModelToEntityMapper.map(doctorModel);
  }
}
