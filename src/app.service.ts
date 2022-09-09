import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class AppService {
  protected tableName = 'todos';

  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(dto: CreateTodoDto) {
    const todo = await this.knex('todos').where({ name: dto.name }).first();
    if (todo) {
      throw new ConflictException(`This ${dto.name} todo already exists`);
    }
    return await this.knex('todos').insert(dto).returning('*');
  }

  findAll() {
    return this.knex('todos').select('*');
  }

  async findOne(id: number) {
    const todo = await this.knex('todos')
      .where({ id })
      .first()
      .then(async (result) => {
        if (!result) {
          throw new NotFoundException(`This ${id} todo not found`);
        }
        return result;
      });
    return await this.knex('todos').where({ id });
  }

  async update(id: number, update: UpdateTodoDto) {
    const todo = await this.knex('todos').where({ id }).first();
    if (!todo) {
      throw new NotFoundException(`This ${id} todo not found`);
    }
    const exists = await this.knex('todos')
      .where({ name: update.name })
      .whereNot({ id })
      .first();
    if (exists) {
      throw new ConflictException(`This ${update.name} already exists`);
    }
    return this.knex('todos').where({ id }).update(update);
  }

  delete(id: number) {
    const todo = this.knex('todos').where({ id });
    if (!todo) {
      throw new NotFoundException('Not found');
    }
    return this.knex('todos').where({ id }).delete();
  }
}
