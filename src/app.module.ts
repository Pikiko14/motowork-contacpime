import { Module } from '@nestjs/common';
import { ContacpimeModule } from './contacpime/contacpime.module';

@Module({
  imports: [ContacpimeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
