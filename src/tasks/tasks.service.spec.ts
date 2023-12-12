import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { JsonDbRepository } from 'src/db/json-db-repository';
import { Task, TaskStatus } from './entity/task.entity';
import { CategoriesService } from '../categories/categories.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let taskService: TasksService;
  let repository: JsonDbRepository<Task>;
  let categoryService: CategoriesService;

  const mockTask = {
    id: 'e16328dd-c325-4098-b5a8-3002c3915813',
    title: 'eat',
    description: 'i have to eat today',
    categoryId: '50376a95-11fb-4310-a36c-b08c6c537874',
    status: TaskStatus.OPEN,
  };

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        CategoriesService,
        {
          provide: 'TaskRepository',
          useValue: mockService,
        },
        {
          provide: 'CategoryRepository',
          useValue: mockService,
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    categoryService = module.get<CategoriesService>(CategoriesService);
    repository = module.get<JsonDbRepository<Task>>('TaskRepository');
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('find all', () => {
    it('should find and return all task', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockTask]);
      const result = await taskService.findAll();
      expect(result).toEqual([mockTask]);
    });
  });

  describe('find one', () => {
    it('should find and return a single task', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockTask);
      const result = await taskService.findOne(mockTask.id);
      expect(repository.findOne).toHaveBeenCalledWith(mockTask.id);
      expect(result).toEqual(mockTask);
    });
  });

  describe('create', () => {
    const newTask = {
      title: 'eat',
      description: 'i have to eat today',
      categoryId: '50376a95-11fb-4310-a36c-bc537874',
    };
    // it('should throw a not found exception if category is not found', async () => {
    //   jest.spyOn(categoryService, 'findOneCategory').mockResolvedValue(null);

    //   await expect(
    //     categoryService.findOneCategory(newTask.categoryId),
    //   ).rejects.toThrow(NotFoundException);
    // });

    it('should create a new task', async () => {
      jest.spyOn(categoryService, 'findOneCategory').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(mockTask);

      const result = await taskService.create(newTask as CreateTaskDto);

      expect(result).toEqual(mockTask);
    });
  });
});
