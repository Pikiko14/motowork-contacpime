import { IProduct, IProductMotowork } from '../interfaces/products.interface';

/**
 * Prepara un producto y lo retorna en el formato correcto
 * Para guardarlo en la base de datos.
 * @param { IProduct[] } products
 * @return { IProductMotowork[] }
 */
export const prepareProduct = (products: IProduct[]): IProductMotowork[] => {
  const productList: IProductMotowork[] = [];

  for (const product of products) {
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
        category: '',
        description: product?.sdescrip,
        sku: product?.irecurso || '',
        type: 'product',
        active: true,
        msaldo: product?.msaldo || 0,
    });
  }

  return productList;
};
