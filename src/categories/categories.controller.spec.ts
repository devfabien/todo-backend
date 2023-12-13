import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesController', () => {
  let categoryController: CategoriesController;
  let categoryService: CategoriesService;

  const mockCategory = {
    id: '9abefa25-9d39-45d8-9840-145e9ea6b9d4',
    name: 'first category',
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    create: jest.fn().mockResolvedValue(mockCategory),
    delete: jest.fn().mockResolvedValue('Data deleted successfully'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockService,
        },
      ],
    }).compile();

    categoryController = module.get<CategoriesController>(CategoriesController);
    categoryService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const result = await categoryController.getAllCategories();

      expect(categoryService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const newCategory = {
        name: 'first category',
      };
      const result = await categoryController.createCategory(
        newCategory as CreateCategoryDto,
      );

      expect(categoryService.create).toHaveBeenCalled();
      expect(result).toEqual(mockCategory);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const result = await categoryController.deleteCategory(mockCategory.id);

      expect(categoryService.delete).toHaveBeenCalled();
      expect(result).toEqual('Data deleted successfully');
    });
  });
});
