import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { ProceduresService } from './procedures.service';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a procedure' })
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.proceduresService.create(createProcedureDto);
  }
}
