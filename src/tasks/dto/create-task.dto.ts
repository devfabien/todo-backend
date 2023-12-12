import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TaskStatus } from '../entity/task.entity';

export class CreateTaskDto {
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  readonly status: TaskStatus;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsUUID()
  readonly categoryId: string;
}
