import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CachingModule } from 'src/cache/cache.module';
import { ContacpimeService } from './contacpime.service';
import { ContacpimeController } from './contacpime.controller';
import { ProductClientService } from 'src/commons/products/products.service';

@Module({
  imports: [
    CachingModule,
    HttpModule,
  ],
  controllers: [ContacpimeController],
  providers: [ContacpimeService, ProductClientService],
  exports: [ContacpimeService],
})
export class ContacpimeModule {}
