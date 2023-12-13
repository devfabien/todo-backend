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
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<string> {
    return this.categoryService.delete(id);
  }
}
