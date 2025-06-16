export interface IProduct {
  irecurso: string;
  nrecurso: string;
  nunidad: string;
  igrupoinv: string;
  besalias: string;
  irecursobase: string;
  bcontrolinv: string;
  bconsumo: string;
  bventa: string;
  bproducto: string;
  bservicio: string;
  bvisible: string;
  bvisibleinternet: string;
  bdescfinanciero: string;
  bescomisionable: string;
  bcodbarras: string;
  sdescrip: string;
  nunidadcompra: string;
  qfactor: string;
  balquiler: string;
  itdtiempo: any;
  nunidadqpeso: string;
  qpeso: any;
  nunidadqvolumen: string;
  qvolumen: any;
  sreffabricante: string;
  smarca: string;
  idepinv: string;
  clase1: string;
  clase2: string;
  tipo1: string;
  tipo2: string;
  dato1: string;
  dato2: string;
  dato3: string;
  sobservaciones: any;
  bcompuesto: string;
  itddescarga: string;
  bafectacuentapadre: string;
  itdfactcompuesto: string;
  itdcotizcompuesto: string;
  bcuentainv: string;
  icuentainv: string;
  bcuentadevcompra: string;
  icuentadevcompra: string;
  bcuentadevventa: string;
  icuentadevventa: string;
  bcuentacostos: string;
  icuentacostos: string;
  bcuentaegr: string;
  icuentaegr: string;
  bicuentasporclaseegr: string;
  bcuentavta: string;
  icuentavta: string;
  bicuentasporclaseing: string;
  bconceptocompra: string;
  iconceptocompra1: string;
  iconceptocompra2: string;
  iconceptocompra3: string;
  iconceptocompra4: string;
  bivamayorvalor: string;
  bconceptoventa: string;
  iconceptoventa1: string;
  iconceptoventa2: string;
  iconceptoventa3: string;
  iconceptoventa4: string;
  sparams: string;
  qregpartescompuesto: string;
  qregtrasladoegr: string;
  qregtrasladoing: string;
  bexigedato1: string;
  bexigedato2: string;
  bexigedato3: string;
  bexigedato4: string;
  bexigedato5: string;
  bexigedato6: string;
  bexigevalor1: string;
  bexigevalor2: string;
  iws: string;
  fcreacion: string;
  iusuario: string;
  iwsult: string;
  fultima: string;
  iusuarioult: string;
  isucursal: string;
  iconceptocompra5: string;
  iconceptocompra6: string;
  iconceptoventa5: string;
  bexigevalor3: string;
  bexigevalor4: string;
  bunidadventa: string;
  nunidadventa: string;
  qfactorunidadventa: string;
  bconteoundfisica: string;
  iconceptoventa6: string;
  qregequivalentes: string;
  bpermiteasignarpreciovta: string;
  bobservacioneshtml: string;
  bincluirencotizacion: string;
  berrorsicostooprecioencero: string;
  smodelo: string;
  iconceptocompra7: string;
  iconceptoventa7: string;
  bpersonalizargrupodiasiniva: string;
  igrupodiasiniva: string;
  sgenerodiasiniva: string;
  bunidadcompra: string;
  bcantidadporbascula: string;
  bpersonalizarctas: string;
  nunidadstd: string;
  itdcodificacionstd: any;
  scodigostd: string;
  surlimg: string;
  bempresaasumeiva: string;
  iconceptoivafaltante: string;
  qregfiles: any;
  initcxxvta: string;
  iconceptocompra8: string;
  iconceptoventa8: string;
  qmlimpbebidasazucaradas: any;
  qgrimpbebidasazucaradas: any;
  bpermiteusar: string;
  ibodega: string;
  msaldo: string;
}

export interface IProductMotowork {
  name: string;
  model: string;
  state: string;
  brand: string;
  brand_icon: string;
  price: number;
  discount: any;
  category: string;
  description: string;
  sku: string;
  type: string;
  active: boolean;
  details?: Details;
  additionalInfo?: AdditionalInfo[];
  variants?: Variant[];
  banner: Banner[];
  images: Image[];
  reviews?: Review[];
  msaldo?: string | number;
}

export interface Details {
  power: number;
  weight: string;
  max_power: string;
  torque: string;
  type_engine: string;
  colors: any[];
}

export interface AdditionalInfo {
  sectionName: string;
  enable: boolean;
  subsections: Subsection[];
}

export interface Subsection {
  name: string;
  value: string;
}

export interface Variant {
  sku: string;
  attribute: string;
  description: string;
  image: string;
}

export interface Banner {
  type_banner: string;
  path: string;
}

export interface Image {
  path: string;
  type: string;
}

export interface Review {
  date: string;
  amount: number;
  name: string;
  description: string;
}
