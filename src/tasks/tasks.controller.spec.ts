import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TaskStatus } from './entity/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

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
    create: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn().mockResolvedValue('Data deleted successfully'),
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
  describe('getTask', () => {
    it('should get a single task', async () => {
      const result = await taskController.getTask(mockTask.id);
      expect(taskService.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });
  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const result = await taskController.getAllTasks();
      expect(taskService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTask]);
    });
  });
  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'eat',
        description: 'i have to eat today',
        categoryId: '50376a95-11fb-4310-a36c-b08c6c537874',
      };

      const result = await taskController.createTask(newTask as CreateTaskDto);
      expect(taskService.create).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });
  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const result = await taskController.deleteTask(mockTask.id);

      expect(taskService.remove).toHaveBeenCalled();
      expect(result).toEqual('Data deleted successfully');
    });
  });
});
