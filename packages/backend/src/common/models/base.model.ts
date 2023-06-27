import { BaseEntity } from "../../core/db/entities/base";

export abstract class BaseModel {
  id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  abstract mappingToDao(): any;

  constructor(init?: Partial<BaseModel>) {
    Object.assign(this, init);
  }

  baseToDomain(base: BaseEntity) {
    return {
      id: base?.id,
      createdAt: base?.created_at,
      createdBy: base?.created_by,
      updatedAt: base?.updated_at,
      updatedBy: base?.created_by,
    };
  }

  baseToDao() {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy,
    };
  }
}
