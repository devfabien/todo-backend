import { Inject, Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { JsonDbRepository } from 'src/db/json-db-repository';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: JsonDbRepository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.create(category);
  }
}
