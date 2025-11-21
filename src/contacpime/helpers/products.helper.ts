import { IProduct, IProductMotowork } from '../interfaces/products.interface';

const CATEGORIAS_PRODUCTOS = {
  1: 'REPUESTOS MOTOR',
  2: 'REPUESTOS CHASIS',
  3: 'REPUESTOS ELECTRICOS',
  4: 'TORNILLERIA Y AFINES',
  5: 'LUBRICANTES',
  6: 'LLANTAS NEUMATICOS O RINES',
  7: 'REPUESTOS ESTANDAR',
  8: 'ACCESORIOS',
  9: 'INDUMENTARIA',
  10: 'SERVICIO TECNICO',
  11: 'PASTAS Y BANDAS DE FRENO',
};

/**
 * Prepara un producto y lo retorna en el formato correcto
 * Para guardarlo en la base de datos.
 * @param { IProduct[] } products
 * @return { IProductMotowork[] }
 */
export const prepareProduct = (products: IProduct[]): IProductMotowork[] => {
  const productList: IProductMotowork[] = [];

  for (const product of products) {
    if (product?.smarca.toUpperCase() !== 'YAMAHA' && parseInt(product.msaldo ) > 0) {
      productList.push({
        name: product?.nrecurso,
        model: product?.smodelo || product?.sreffabricante,
        state: 'Nueva',
        brand: product?.smarca,
        discount: null,
        brand_icon: null,
        price: 0,
        //details: {
        //    power: 0,
        //    weight: '',
        //    max_power: '',
        //    torque: '',
        //    type_engine: '',
        //    colors: [],
        //},
        // additionalInfo: [],
        // variants: [],
        banner: [],
        images: [],
        // reviews: [],
        category:
          CATEGORIAS_PRODUCTOS[product?.igrupoinv] || product?.igrupoinv,
        description: product?.sdescrip,
        sku: product?.irecurso || '',
        type: 'product',
        active: true,
        msaldo: product?.msaldo || 0,
      });
    }
  }

  return productList;
};
