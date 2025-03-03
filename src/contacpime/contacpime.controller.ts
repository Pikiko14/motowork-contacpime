import {
  Controller,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContacpimeService } from './contacpime.service';
import { GetProductDto } from './dto/get-contacpime.dto';
import { HostGuard } from 'src/commons/guards/host.guard';

@Controller('contacpime')
export class ContacpimeController {
  constructor(private readonly contacpimeService: ContacpimeService) {}

  @Get()
  @UseGuards(HostGuard)
  create(@Query() getProdyctDto: GetProductDto) {
    return this.contacpimeService.getProduct(getProdyctDto);
  }
}
