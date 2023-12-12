import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entity/task.entity';
import { JsonDbRepository } from 'src/db/json-db-repository';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [CategoriesModule],
  providers: [
    TasksService,
    {
      provide: 'TaskRepository',
      useFactory: () => new JsonDbRepository<Task>('tasks'),
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}
