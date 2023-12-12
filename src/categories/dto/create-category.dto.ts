import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
