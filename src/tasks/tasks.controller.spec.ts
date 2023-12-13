import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TaskStatus } from './entity/task.entity';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TasksService;

  const mockTask = {
    id: 'e16328dd-c325-4098-b5a8-3002c3915813',
    title: 'eat',
    description: 'i have to eat today',
    categoryId: '50376a95-11fb-4310-a36c-b08c6c537874',
    status: TaskStatus.OPEN,
  };

  const mockService = {
    findOne: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockService,
        },
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
  describe('create', () => {
    it('should create a new task', async () => {
      const result = await taskController.getTask(mockTask.id);
      expect(result).toEqual(mockTask);
    });
  });
});
