import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entity/task.entity';
import { JsonDbRepository } from 'src/db/json-db-repository';

@Module({
  imports: [],
  providers: [
    TasksService,
    {
      provide: 'TaskRepository',
      useFactory: () => new JsonDbRepository<Task>('tasks'),
    },
  ],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
