import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<string> {
    return this.taskService.remove(id);
  }
}
