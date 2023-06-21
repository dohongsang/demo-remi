import { BaseEntity } from "../../core/db/entities/base";

export class BaseModel {
  id?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  constructor(init: Partial<BaseEntity>) {
    Object.assign(this, this.baseToDto(init));
  }

  protected baseToDto(init: Partial<BaseEntity>) {
    return {
      id: init?.id,
      createdAt: init?.created_at,
      createdBy: init?.created_by,
      updatedAt: init?.updated_at,
      updatedBy: init?.created_by,
    };
  }
}
