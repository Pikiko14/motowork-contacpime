import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class GetProductDto {
  @IsString()
  @Type(() => String)
  productCode: string;
}
