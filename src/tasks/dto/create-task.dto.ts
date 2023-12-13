import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TaskStatus } from '../entity/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  readonly id: string;

  @ApiProperty({
    title: 'title example',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  readonly status: TaskStatus;

  @ApiProperty({
    title: 'task description example',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    title: 'c9978138-7091-4415-bf21-1ba681974599',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly categoryId: string;
}
