import { ApiService } from "../../core/rest";
import { ServiceResult } from "../../core/rest/models/service-result";

export class AuthService {
  async userLogin<REQ = any, RES = any>(req: REQ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/login`,
      params: req,
    });
  }

  async userRegister<REQ = any, RES = any>(
    req: REQ
  ): Promise<ServiceResult<RES>> {
    return await ApiService.api.post<REQ, RES>({
      url: `/register`,
      params: req,
    });
  }

  async findMe<REQ = any, RES = any>(): Promise<ServiceResult<RES>> {
    return await ApiService.api.get<REQ, RES>({
      url: `/me`,
    });
  }
}
