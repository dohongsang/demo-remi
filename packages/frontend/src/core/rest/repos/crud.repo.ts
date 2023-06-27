import { ServiceResult } from "../models/service-result";

export interface IReposRequest {
  id?: string;
}

export abstract class IRepos<REQ> {
  url: string;
  abstract find<Entity>(req: REQ): Promise<ServiceResult<Entity[]>>;
  abstract findOne<Entity>(req: REQ): Promise<ServiceResult<Entity>>;

  constructor(domain = "") {
    this.url = domain;
  }
}
