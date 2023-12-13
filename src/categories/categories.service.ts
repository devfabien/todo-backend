import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entity/category.entity';
import { JsonDbRepository } from '../db/json-db-repository';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: JsonDbRepository<Category>,
    private taskService: TasksService,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async create(category: Category): Promise<Category> {
    const foundCategory = (await this.findAll())?.find(
      (item) => item.name == category.name,
    );
    if (foundCategory) {
      throw new ConflictException('Category already exists');
    }
    return await this.categoryRepository.create(category);
  }

  async delete(id: string) {
    const foundTask = (await this.taskService.findAll()).find(
      (task) => task.categoryId === id,
    );
    if (foundTask) {
      throw new ConflictException(
        `Can't delet this category since it has tasks referencing to it`,
      );
    }
    const foundCategory = await this.categoryRepository.remove(id);
    if (!foundCategory) {
      throw new NotFoundException(`Category id not found`);
    }

    return foundCategory;
  }
}
