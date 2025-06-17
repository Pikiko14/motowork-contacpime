import {
  Controller,
  Get,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { ContacpimeService } from './contacpime.service';
import { GetProductDto } from './dto/get-contacpime.dto';
import { HostGuard } from 'src/commons/guards/host.guard';

@Controller('contacpime')
export class ContacpimeController {
  constructor(private readonly contacpimeService: ContacpimeService) {}

  @Get()
  @UseGuards(HostGuard)
  getProduct(@Query() getProdyctDto: GetProductDto) {
    return this.contacpimeService.getProductInventory(getProdyctDto);
  }

  @Get('load-inventory')
  @UseGuards(HostGuard)
  loadInventoryProducts() {
    return this.contacpimeService.loadInventoryProducts();
  }

  @Get('product/:sku')
  @UseGuards(HostGuard)
  getElementInventoryData(@Param('sku') sku: string) {
    return this.contacpimeService.loadProductData(sku);
  }
}
