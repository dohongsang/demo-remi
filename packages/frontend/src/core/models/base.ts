export default class BaseModel {
  id!: string;
  createdAt!: string;
  createdBy!: string;
  updatedAt!: string;
  updatedBy!: string;

  constructor(init: Partial<BaseModel>) {
    Object.assign(this, init);
  }
}
