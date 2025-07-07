import { join } from 'path';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CachingModule } from './cache/cache.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { InventoryLoadJob } from './commons/jobs/inventory.job';
import { ContacpimeModule } from './contacpime/contacpime.module';

@Module({
  imports: [
    ContacpimeModule,
    CachingModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [InventoryLoadJob],
})
export class AppModule {}
