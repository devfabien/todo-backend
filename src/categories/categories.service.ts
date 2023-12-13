import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { JsonDbRepository } from '../db/json-db-repository';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: JsonDbRepository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOneCategory(id: string): Promise<Category> {
    const foundcategory = await this.categoryRepository.findOne(id);
    if (!foundcategory) {
      throw new NotFoundException(`Category id not found`);
    }
    return foundcategory;
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.create(category);
  }
}
