import { Doctor } from 'src/modules/procedures/entities/doctor.entity';

export class DoctorModelToEntityMapper {
  public static map({ id, name }: { id: string; name: string }): Doctor {
    return {
      id,
      name,
    };
  }
}
