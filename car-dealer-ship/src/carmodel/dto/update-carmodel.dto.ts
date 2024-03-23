import { IsString, MinLength } from "class-validator";

export class UpdateCarmodelDto {

  @IsString()
  @MinLength(1)
  name:string;
}
