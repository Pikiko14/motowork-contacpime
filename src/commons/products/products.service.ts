import { envs } from 'src/config';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IProductMotowork } from 'src/contacpime/interfaces/products.interface';

@Injectable()
export class ProductClientService {
  constructor(private readonly httpService: HttpService) {}

  async sendProduct(data: IProductMotowork[]): Promise<AxiosResponse<any>> {
    const url =
      envs.app_env === 'develop'
        ? envs.motowork_product_local
        : envs.motowork_product_prod;

    try {
      const response$ = this.httpService.post(`${url}/products/add/from/contapyme`, data);
      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
