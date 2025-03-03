import { Module } from '@nestjs/common';
import { ContacpimeService } from './contacpime.service';
import { ContacpimeController } from './contacpime.controller';

@Module({
  controllers: [ContacpimeController],
  providers: [ContacpimeService],
})
export class ContacpimeModule {}
