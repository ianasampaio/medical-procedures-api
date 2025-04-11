import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database/database.module';
import { ProceduresModule } from './modules/procedures/procedures.module';

@Module({
  imports: [DatabaseModule, ProceduresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
