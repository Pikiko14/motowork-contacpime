import { Module } from '@nestjs/common';
import { CachingModule } from 'src/cache/cache.module';
import { ContacpimeService } from './contacpime.service';
import { ContacpimeController } from './contacpime.controller';

@Module({
  imports: [
    CachingModule
  ],
  controllers: [ContacpimeController],
  providers: [ContacpimeService],
})
export class ContacpimeModule {}
