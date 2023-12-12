import { Injectable } from '@nestjs/common';
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
    try {
      const data = await this.db.getData(
        `/${this.tableName}[${await this.db.getIndex(
          `/${this.tableName}`,
          id,
        )}]`,
      );
      return data;
    } catch (error) {
      return null;
    }
  }

  async create(data: T) {
    const id = uuidv4();
    this.db.push(`/${this.tableName}[]`, { id, ...data }, true);
    return { ...data, id };
  }

  async remove(id: string): Promise<string> {
    this.db.delete(
      `/${this.tableName}[${await this.db.getIndex(`/${this.tableName}`, id)}]`,
    );
    return `Data deleted successfully`;
  }
}
