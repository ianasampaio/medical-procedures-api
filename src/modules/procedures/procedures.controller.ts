import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { DailyProceduresQueryDto } from './dto/get-daily-procedures-by-doctor.dto';
import { DeniedProceduresQueryDto } from './dto/get-denied-procedures-by-date.dto';
import { ProceduresByDoctorQueryDto } from './dto/get-procedures-by-doctor.dto';
import { ProceduresService } from './procedures.service';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a procedure' })
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.proceduresService.create(createProcedureDto);
  }

  @Get('/reports/daily')
  @ApiOperation({ summary: 'Generate a daily report of procedures by doctor' })
  getDailyProceduresByDoctor(
    @Query() dailyProceduresQueryDto: DailyProceduresQueryDto,
  ) {
    return this.proceduresService.getDailyProceduresByDoctor(
      dailyProceduresQueryDto,
    );
  }

  @Get('/reports/denied')
  @ApiOperation({
    summary: 'Generate a denied procedures report between two dates',
  })
  getDeniedProcedures(
    @Query() deniedProceduresQueryDto: DeniedProceduresQueryDto,
  ) {
    return this.proceduresService.getDeniedProcedures(deniedProceduresQueryDto);
  }

  @Get('/reports/financial')
  @ApiOperation({
    summary: 'Generate a financial report of procedures by doctor',
  })
  getFinancialReportByDoctor(
    @Query() proceduresByDoctorQueryDto: ProceduresByDoctorQueryDto,
  ) {
    return this.proceduresService.getFinancialReportByDoctor(
      proceduresByDoctorQueryDto,
    );
  }
}
