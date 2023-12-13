import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoryController: CategoriesController;
  let categoryService: CategoriesService;

  const mockService = {
    findAll: jest.fn(),
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
});
