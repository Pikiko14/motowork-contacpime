import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContacpimeService } from './contacpime.service';
import { GetProductDto } from './dto/get-contacpime.dto';

@Controller('contacpime')
export class ContacpimeController {
  constructor(private readonly contacpimeService: ContacpimeService) {}

  @Get()
  create(@Body() getProdyctDto: GetProductDto) {
    return this.contacpimeService.create(getProdyctDto);
  }
}
