import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GetProductDto } from './dto/get-contacpime.dto';
import { CacheService } from 'src/cache/services/cache.service.service';
import { envs } from 'src/config';

@Injectable()
export class ContacpimeService {
  logger = new Logger();

  constructor(private readonly cacheService: CacheService) {}

  // get product from contact pyme
  async getProduct(getProductDto: GetProductDto): Promise<any> {
    try {
      // get from cache keyagent
      let keyagente = await this.cacheService.getCache('keyagente');

      // validate key agent
      if (!keyagente) {
        keyagente = await this.doLogin();
      }

      // get product data
      const requestUrl = `${envs.url_contacpime}/
      TInventarios/GetSaldoFisicoProductoEnBodegas/
      {"irecurso":"${getProductDto.productCode}"}/${keyagente}/${envs.app_id_contacpime}`;
      const data = await this.doRequest(requestUrl)
      
      // valdiate response
      let productData = null;
      if (data?.result) {
        productData = data.result.shift()
      }

      if (!productData) {
        throw new NotFoundException('No existe el producto en contacpime');
      }

      if (productData?.respuesta && productData?.respuesta?.datos) {
        return productData?.respuesta?.datos.shift();
      } else {
        throw new NotFoundException('No se encontraron datos para el producto en contacpime');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Do login on contactpime
   */
  async doLogin(): Promise<string> {
    try {
      // do login on contacpime
      const requestUrl = `${envs.url_contacpime}/
      TBasicoGeneral/GetAuth/
      {"email":"${envs.user_contacpime}", "password": "${envs.password_contacpime}" }
      //${envs.app_id_contacpime}`;

      const data = await this.doRequest(requestUrl)
      let keyAgent = null;
      // validate response
      if (data.result) {
        const dataObj = data?.result?.shift();
        if (dataObj.respuesta) {
          keyAgent = dataObj?.respuesta?.datos?.keyagente;
        }
      }

      // set in cache
      await this.cacheService.setCache('keyagente', keyAgent, 900000);

      // return keyagent
      return keyAgent;
    } catch (error) {
      this.logger.error(`Error iniciando sesión en contacpime: ${JSON.stringify(error)}`)
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * do request
   * @param { string } url
   */
  async doRequest(url: string) {
    try {
      const request = await fetch(url);
      const data = await request.json();
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
