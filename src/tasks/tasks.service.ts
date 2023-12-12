import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entity/task.entity';
import { JsonDbRepository } from 'src/db/json-db-repository';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepository') private taskRepository: JsonDbRepository<Task>,
    private categoryService: CategoriesService,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async findOne(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne(id);
  }

  async create(task: Task): Promise<Task> {
    const catId = task.categoryId;
    const cate = await this.categoryService.findAll();
    const single = cate.find((category) => category.id === catId);
    const newTask = { ...task, status: TaskStatus.OPEN };
    if (!single) throw new NotFoundException(`Category id doesn't exist`);
    return await this.taskRepository.create(newTask);
  }

  async remove(id: string): Promise<string> {
    return await this.taskRepository.remove(id);
  }
}
