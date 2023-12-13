import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { JsonDbRepository } from 'src/db/json-db-repository';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';

describe('CategoriesService', () => {
  let categoryService: CategoriesService;
  let repository: JsonDbRepository<Category>;
  let taskService: TasksService;

  const mockCategory = {
    id: '9abefa25-9d39-45d8-9840-145e9ea6b9d4',
    name: 'first category',
  };
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        TasksService,
        {
          provide: 'CategoryRepository',
          useValue: mockService,
        },
        {
          provide: 'TaskRepository',
          useValue: mockService,
        },
      ],
    }).compile();

    categoryService = module.get<CategoriesService>(CategoriesService);
    repository = module.get<JsonDbRepository<Category>>('CategoryRepository');
    taskService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });
  describe('create category', () => {
    const newCategory = {
      name: 'first category',
    };
    it('should create a new category', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);
      jest.spyOn(repository, 'create').mockResolvedValue(mockCategory);
      const result = await categoryService.create(
        newCategory as CreateCategoryDto,
      );
      expect(result).toEqual(mockCategory);
    });
    it('should throw a conflict exception when category already exists', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockCategory]);
      expect(
        categoryService.create(newCategory as CreateCategoryDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findOneCategory', () => {
    it('should find one category', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockCategory);
      const result = await categoryService.findOneCategory(mockCategory.id);
      expect(result).toEqual(mockCategory);
    });
    it('should should throw a NotFoundException if category not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const result = categoryService.findOneCategory(mockCategory.id);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
  describe('findAll', () => {
    it('should find all categories', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockCategory]);

      const result = await categoryService.findAll();
      expect(result).toEqual([mockCategory]);
    });
  });
});
