import { TaskStatus } from '../entity/task.entity';

export class CreateTaskDto {
  readonly id: string;
  readonly title: string;
  readonly status: TaskStatus.OPEN;
  readonly description: string;
  readonly categoryId: string;
}
