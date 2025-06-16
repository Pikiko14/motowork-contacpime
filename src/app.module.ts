import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CachingModule } from './cache/cache.module';
import { InventoryLoadJob } from './commons/jobs/inventory.job';
import { ContacpimeModule } from './contacpime/contacpime.module';

@Module({
  imports: [
    ContacpimeModule,
    CachingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [InventoryLoadJob],
})
export class AppModule {}
