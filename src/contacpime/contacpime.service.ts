import { Injectable } from '@nestjs/common';
import { GetProductDto } from './dto/get-contacpime.dto';

@Injectable()
export class ContacpimeService {
  create(getProdyctDto: GetProductDto) {
    return getProdyctDto;
  }
}
