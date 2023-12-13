import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  readonly id: string;

  @ApiProperty({
    title: 'name example',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
