import { Module } from '@nestjs/common';
import { CachingModule } from './cache/cache.module';
import { ContacpimeModule } from './contacpime/contacpime.module';

@Module({
  imports: [ContacpimeModule, CachingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
