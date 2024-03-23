import { IsString, MinLength } from "class-validator";

export class CreateCarmodelDto {

  @IsString()
  @MinLength(1)
  name:string;
}
