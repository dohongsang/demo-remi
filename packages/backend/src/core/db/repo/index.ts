import { isEmpty } from "lodash";
import { Service } from "typedi";
import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  UpdateResult,
} from "typeorm";
import { Database } from "..";
import { BaseModel } from "../../../common/models/base.model";
import { UserModel } from "../../../common/models/user.model";

export interface IRepo {
  insertData<T>(data: T, user: UserModel): Promise<ObjectLiteral[]>;
  updateData<T>(data: T, user: UserModel): Promise<UpdateResult>;
}

@Service()
export class Dao {
  entity: any;
  currentUser: any;

  constructor(entity: EntityTarget<any>) {
    this.entity = entity;
  }

  async insert(data: BaseModel): Promise<any> {
    const repo = Database.datasource.getRepository(this.entity);
    const row = this.toDao(data);
    row.created_at = new Date().toISOString();
    return await repo.save(row);
  }

  async update(data: BaseModel): Promise<any> {
    const repo = Database.datasource.getRepository(this.entity);
    const row = this.toDao(data);
    row.updated_at = new Date().toISOString();
    return await repo.update(row.id, row);
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

  async transaction(cb: (entityManager: EntityManager) => Promise<unknown>) {
    return await Database.datasource.manager.transaction(cb.bind(this));
  }

  private toDao(data: BaseModel) {
    return {
      ...data.baseToDao(),
      ...data.mappingToDao(),
    };
  }
}
