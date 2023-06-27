export class ServiceResult<T> {
  status!: string;
  data!: T;
  total!: number;
  page!: number;
  pageCount!: number;

  constructor(init: ServiceResult<T | T[]>) {
    Object.assign(this, init);
  }
}
