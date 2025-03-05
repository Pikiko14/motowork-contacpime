import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class GetProductDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  productCode: string;

  @IsString()
  @Type(() => String)
  variantsSkuArr: string;
}
