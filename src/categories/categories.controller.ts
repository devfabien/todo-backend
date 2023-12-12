import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  async createCategory(@Body() category: Category): Promise<Category> {
    return await this.categoryService.create(category);
  }
}
