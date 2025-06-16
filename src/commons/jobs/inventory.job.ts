import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ContacpimeService } from "src/contacpime/contacpime.service";

@Injectable()
export class InventoryLoadJob {
  // attributes
  private readonly logger = new Logger(InventoryLoadJob.name);

  // constructor
  constructor (
    private readonly contapymeService: ContacpimeService,
  ) {}

  // Cron Job dia a la media noche
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    // log inicial
    this.logger.log('Cargando inventario de Moto Work desde contapyme');

    // logica del cronjob
    const product = await this.contapymeService.loadInventoryProducts();
    console.log(product);

    // log final
    this.logger.log('Termino de cargar los productos.');
  }
}