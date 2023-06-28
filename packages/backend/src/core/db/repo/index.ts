import { isEmpty } from "lodash";
import { ForbiddenError } from "routing-controllers";
import { Service } from "typedi";
import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  UpdateResult,
} from "typeorm";
import { Database } from "..";
import { BaseModel } from "../../../common/models/base.model";

@Service()
export class Dao {
  entity: any;
  currentUser: any;

  constructor(entity: EntityTarget<any>) {
    this.entity = entity;
  }

  async insert(data: BaseModel, entityManager?: EntityManager): Promise<any> {
    try {
      const repo = entityManager
        ? entityManager.getRepository(this.entity)
        : Database.datasource.getRepository(this.entity);
      const row = this.toDao(data);
      row.created_at = new Date().toISOString();
      return await repo.save(row);
    } catch (error: any) {
      console.error({ error });
      if (
        error.message.match(/duplicate key value violates unique constraint/g)
      ) {
        throw new ForbiddenError("Data existed in system.");
      }
    }
  }

  async update(
    data: BaseModel,
    where?: FindOptionsWhere<any>,
    entityManager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = entityManager
      ? entityManager.getRepository(this.entity)
      : Database.datasource.getRepository(this.entity);
    const row = this.toDao(data);
    row.updated_at = new Date().toISOString();
    return await repo.update(where ? where : row.id, row);
  }

  async findOne(
    where: FindOptionsWhere<any>,
    relations?: FindOptionsRelations<any>
  ): Promise<any> {
    const repo = Database.datasource.getRepository(this.entity);

    const conditions: FindOneOptions<any> = {};
    if (where && !isEmpty(where)) {
      conditions.where = where;
    }

    if (relations && !isEmpty(relations)) {
      conditions.relations = relations;
    }

    const result = await repo.findOne(conditions);
    return result;
  }

  async find(
    where?: FindOptionsWhere<any>,
    relations?: FindOptionsRelations<any>
  ): Promise<any> {
    const repo = Database.datasource.getRepository(this.entity);

    const conditions: FindManyOptions<any> = {};
    if (where && !isEmpty(where)) {
      conditions.where = where;
    }

    if (relations && !isEmpty(relations)) {
      conditions.relations = relations;
    }

    const result = await repo.find(conditions);
    return result;
  }

  async transaction(
    excute: (entityManager: EntityManager) => Promise<unknown>
  ) {
    const queryRunner = Database.datasource.createQueryRunner();
    const manager = queryRunner.manager;

    if (queryRunner) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await excute(manager);
        await queryRunner.commitTransaction();
      } catch (error: any) {
        console.error({ error });
        await queryRunner.rollbackTransaction();
        throw new ForbiddenError("Something went wrong.");
      } finally {
        await queryRunner.release();
      }
    }
  }

  private toDao(data: BaseModel) {
    return {
      ...data.baseToDao(),
      ...data.mappingToDao(),
    };
  }
}
