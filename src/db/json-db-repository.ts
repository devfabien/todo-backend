import { Injectable, NotFoundException } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JsonDbRepository<T> {
  private db: JsonDB;

  constructor(private tableName: string) {
    const config = new Config('todos', true, false, '/');
    this.db = new JsonDB(config);
    this.db.push(`/${this.tableName}`, []);
  }

  async findAll(): Promise<T[]> {
    return this.db.getData(`/${this.tableName}`);
  }

  async findOne(id: string): Promise<T | null> {
    const index = await this.db.getIndex(`/${this.tableName}`, id);
    if (index < 0) throw new NotFoundException(`id doesn't exist`);
    const data = await this.db.getData(`/${this.tableName}[${index}]`);
    return data;
  }

  async create(data: T) {
    const id = uuidv4();
    this.db.push(`/${this.tableName}[]`, { id, ...data }, true);
    return { ...data, id };
  }

  async remove(id: string): Promise<string> {
    const index = await this.db.getIndex(`/${this.tableName}`, id);
    if (index < 0) throw new NotFoundException(`id doesn't exist`);
    this.db.delete(`/${this.tableName}[${index}]`);
    return `Data deleted successfully`;
  }
}
