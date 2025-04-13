import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctorRepository } from 'src/infra/database/prisma/repositories/doctor/doctor.repository';
import { ProcedureRepository } from 'src/infra/database/prisma/repositories/procedure/procedure.repository';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { DailyProceduresQueryDto } from './dto/get-daily-procedures-by-doctor.dto';
import { DeniedProceduresQueryDto } from './dto/get-denied-procedures-by-date.dto';
import { Doctor } from './entities/doctor.entity';
import { PaymentStatus, Procedure } from './entities/procedure.entity';
import { ProceduresService } from './procedures.service';

describe('ProceduresService', () => {
  let service: ProceduresService;
  let procedureRepository: ProcedureRepository;
  let doctorRepository: DoctorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProceduresService,
        {
          provide: ProcedureRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(null),
            findDailyProceduresByDoctor: jest.fn().mockResolvedValue(null),
            findDeniedProcedures: jest.fn().mockResolvedValue(null),
            findProceduresByDoctor: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: DoctorRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<ProceduresService>(ProceduresService);
    procedureRepository = module.get<ProcedureRepository>(ProcedureRepository);
    doctorRepository = module.get<DoctorRepository>(DoctorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(procedureRepository).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a procedure', async () => {
      const createProcedure: CreateProcedureDto = {
        doctorId: 'b0494b58-9d73-4b10-a6ab-338def097778',
        pacientId: '322ac7b9-0355-45d8-8821-fef9b05b0049',
        amount: 200,
        paymentStatus: PaymentStatus.DENIED,
      };

      await service.create(createProcedure);

      expect(procedureRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDailyProceduresByDoctor', () => {
    it('should generate a daily procedures report by doctor', async () => {
      const doctor: Doctor = {
        id: 'b0494b58-9d73-4b10-a6ab-338def097778',
        name: 'doctor',
      };

      jest.spyOn(doctorRepository, 'findById').mockResolvedValueOnce(doctor);

      const dailyProcedure: DailyProceduresQueryDto = {
        doctorId: 'b0494b58-9d73-4b10-a6ab-338def097778',
        procedureDate: '2025-04-11T14:39:33.348Z',
      };

      await service.getDailyProceduresByDoctor(dailyProcedure);

      expect(doctorRepository.findById).toHaveBeenCalledTimes(1);
      expect(
        procedureRepository.findDailyProceduresByDoctor,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception when doctor is not found', async () => {
      const doctorId = 'id';
      const procedureDate = 'date';

      const notFoundException = new NotFoundException(`Doctor not found`);

      await expect(
        service.getDailyProceduresByDoctor({ doctorId, procedureDate }),
      ).rejects.toEqual(notFoundException);
    });
  });

  describe('getDeniedProcedures', () => {
    it('should generate a denied procedures report between two dates', async () => {
      const deniedProcedures: DeniedProceduresQueryDto = {
        startDate: '2025-04-11T14:39:33.348Z',
        endDate: '2025-04-12T14:39:33.348Z',
      };

      await service.getDeniedProcedures(deniedProcedures);

      expect(procedureRepository.findDeniedProcedures).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFinancialReportByDoctor', () => {
    it('should return financial report for doctor', async () => {
      const doctorId = 'b0494b58-9d73-4b10-a6ab-338def097778';
      const doctor = { id: doctorId, name: 'Dr. John' };
      const procedures: Procedure[] = [
        {
          id: 'ceaf3983-7e80-4357-a083-5b4baf019c85',
          doctorId: 'b0494b58-9d73-4b10-a6ab-338def097778',
          pacientId: '322ac7b9-0355-45d8-8821-fef9b05b0049',
          procedureDate: new Date(),
          amount: 1000,
          paymentStatus: PaymentStatus.DENIED,
        },
      ];

      jest.spyOn(doctorRepository, 'findById').mockResolvedValueOnce(doctor);
      jest
        .spyOn(procedureRepository, 'findProceduresByDoctor')
        .mockResolvedValueOnce(procedures);

      const result = await service.getFinancialReportByDoctor({ doctorId });

      expect(result).toEqual({
        doctor: doctor.name,
        totalPaid: 0,
        totalPending: 0,
        totalDenied: 1000,
        procedures,
      });
      expect(doctorRepository.findById).toHaveBeenCalledTimes(1);
      expect(procedureRepository.findProceduresByDoctor).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw a not found exception when doctor is not found', async () => {
      const doctorId = 'id';

      const notFoundException = new NotFoundException(`Doctor not found`);

      await expect(
        service.getFinancialReportByDoctor({ doctorId }),
      ).rejects.toEqual(notFoundException);
    });
  });
});
