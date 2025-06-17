import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { envs } from 'src/config';
import { GetProductDto } from './dto/get-contacpime.dto';
import { prepareProduct } from './helpers/products.helper';
import { IProductMotowork } from './interfaces/products.interface';
import { CacheService } from 'src/cache/services/cache.service.service';
import { ProductClientService } from 'src/commons/products/products.service';

@Injectable()
export class ContacpimeService {
  logger = new Logger(ContacpimeService.name);
  page: number = 1;
  totalPages: number = 0;
  products: IProductMotowork[] = [];

  constructor(
    private readonly cacheService: CacheService,
    private readonly productHttpService: ProductClientService,
  ) {}

  // get product from contacpime
  async getProductInventory(getProductDto: GetProductDto): Promise<any> {
    try {
      let keyagente = await this.cacheService.getCache('keyagente');

      if (!keyagente) {
        keyagente = await this.doLogin();
      }

      const arrCodes = getProductDto.variantsSkuArr.split(', ');

      const requestUrl = `${envs.url_contacpime}/TInventarios/GetSaldoFisicoProductoEnBodegas/{"irecurso":"${getProductDto.productCode}"}/${keyagente}/${envs.app_id_contacpime}`;
      const data = await this.doRequest(requestUrl);

      let variantsData = null;
      if (arrCodes && arrCodes.length > 0) {
        const requests = arrCodes.map((code) => {
          const variantRequestUrl = `${envs.url_contacpime}/TInventarios/GetSaldoFisicoProductoEnBodegas/{"irecurso":"${code}"}/${keyagente}/${envs.app_id_contacpime}`;
          return this.doRequest(variantRequestUrl);
        });

        variantsData = await Promise.all(requests);
      }

      let productData = null;
      if (data?.result) {
        productData = data.result.shift();
      }

      variantsData = variantsData.map((el) => {
        const result = el?.result?.shift();
        const response = result?.respuesta;
        return response?.datos?.shift();
      });

      if (!productData) {
        throw new NotFoundException('No existe el producto en contacpime');
      }

      if (productData?.respuesta && productData?.respuesta?.datos) {
        return {
          success: true,
          message: 'Información del producto en contacpime',
          data: {
            product: productData?.respuesta?.datos.shift(),
            variants: variantsData,
          },
        };
      } else {
        throw new NotFoundException(
          'No se encontraron datos para el producto en contacpime',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Do login on contacpime
   */
  async doLogin(): Promise<string> {
    try {
      const requestUrl = `${envs.url_contacpime}/TBasicoGeneral/GetAuth/{"email":"${envs.user_contacpime}", "password": "${envs.password_contacpime}"}//${envs.app_id_contacpime}`;

      const data = await this.doRequest(requestUrl);

      let keyAgent = null;

      if (data.result) {
        const dataObj = data?.result?.shift();
        if (dataObj.respuesta) {
          keyAgent = dataObj?.respuesta?.datos?.keyagente;
        }
      }

      await this.cacheService.setCache('keyagente', keyAgent, 900000);
      return keyAgent;
    } catch (error) {
      this.logger.error(
        `Error iniciando sesión en contacpime: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Load inventory
   */
  async loadInventoryProducts(): Promise<any> {
    try {
      const requestUrl = `${envs.url_contacpime}/TCatElemInv/"GetListaElemInv"/`;

      let keyagente = await this.cacheService.getCache('keyagente');
      if (!keyagente) {
        keyagente = await this.doLogin();
      }

      this.logger.log(
        `Cargando página de productos #${this.page} ${
          this.totalPages > 0 ? `de un total de ${this.totalPages}` : ''
        }`,
      );

      const dataJSON = {
        datospagina: {
          cantidadregistros: '100',
          pagina: `${this.page}`,
        },
        datosfiltro: {},
      };

      const JSONSend = {
        _parameters: [
          JSON.stringify(dataJSON),
          keyagente,
          envs.app_id_contacpime,
          '0',
        ],
      };

      const result = await this.doRequest(requestUrl, {
        method: 'POST',
        body: JSONSend,
      });

      // validamos los resultados
      if (result?.result && result?.result.length > 0) {
        const contapymeResponse = result.result.shift();
        const { paginacion, datos } = contapymeResponse.respuesta;
        if (paginacion.totalpaginas) {
          this.totalPages = parseInt(paginacion.totalpaginas);
        }

        if (datos.length > 0) {
          const products = prepareProduct(datos);

          // load quantity and prices
          for (let i = 0; i < products.length; i++) {
            // validate status active
            if (parseInt(products[i].msaldo as string) === 0) {
              products[i].active = false;
            }
          }
          this.products = products;
        }
      }

      // validamos la recursividad.
      if (this.page < 1) {
        // this.totalPages
        // send to product ms de tyhis products
        await this.sendProductToMs();
        this.products = [];

        // enable this this.totalPages
        this.page++;

        // call recursivity
        return this.loadInventoryProducts();
      }

      // send if is last page
      this.logger.log(`Enviando la pagina ${this.page} a MS de productos`);
      await this.sendProductToMs();
      this.products = [];

      // reset counters
      this.page = 1;
      this.totalPages = 0;

      return {
        success: true,
        data: this.products,
      };
    } catch (error) {
      this.logger.error('Error loading inventory products:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * load product data
   * @param { string } productId
   */
  async loadProductData(productId: string) {
    const requestUrl = `${envs.url_contacpime}/TCatElemInv/"GetInfoElemInv"/`;

    let keyagente = await this.cacheService.getCache('keyagente');
    if (!keyagente) {
      keyagente = await this.doLogin();
    }

    const dataJSON = {
      irecurso: productId,
    };

    const JSONSend = {
      _parameters: [
        JSON.stringify(dataJSON),
        keyagente,
        envs.app_id_contacpime,
        '0',
      ],
    };

    const result = await this.doRequest(requestUrl, {
      method: 'POST',
      body: JSONSend,
    });

    return result?.result;
  }

  /**
   * Send products to MS
   */
  async sendProductToMs() {
    this.logger.log(`Enviando la pagina ${this.page} a MS de productos`);
    await this.productHttpService.sendProduct(this.products);
  }

  /**
   * General method for GET or POST requests
   */
  async doRequest(
    url: string,
    options: {
      method?: 'GET' | 'POST';
      headers?: Record<string, string>;
      body?: any;
    } = {},
  ): Promise<any> {
    try {
      const { method = 'GET', headers = {}, body = null } = options;

      const fetchOptions: RequestInit = {
        method,
        headers,
      };

      if (body) {
        fetchOptions.body =
          typeof body === 'string' ? body : JSON.stringify(body);

        if (!headers['Content-Type']) {
          fetchOptions.headers = {
            ...headers,
            'Content-Type': 'application/json',
          };
        }
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
