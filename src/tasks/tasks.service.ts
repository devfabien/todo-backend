import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entity/task.entity';
import { JsonDbRepository } from '../db/json-db-repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepository') private taskRepository: JsonDbRepository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async findOne(id: string): Promise<Task | null> {
    const foundTask = await this.taskRepository.findOne(id);
    if (!foundTask) {
      throw new NotFoundException(`Task id not found`);
    }
    return foundTask;
  }

  async create(task: Task): Promise<Task> {
    const newTask = { ...task, status: TaskStatus.OPEN };
    return await this.taskRepository.create(newTask);
  }

  async remove(id: string): Promise<string> {
    const foundTask = await this.taskRepository.remove(id);
    if (!foundTask) {
      throw new NotFoundException(`Task id not found`);
    }
    return foundTask;
  }
}
