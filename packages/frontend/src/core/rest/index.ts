import { Axios, AxiosRequestConfig, Method } from "axios";
import { AxiosService } from "./axios";
import { ServiceResult } from "./models/service-result";

export interface IApiContext extends AxiosRequestConfig {
  token?: string;
}

interface RequestParams<RES> {
  url: string;
  ctx?: IApiContext;
  params?: RES;
}

interface IApiService {
  get<REQ, RES>(
    request: RequestParams<REQ>,
    mapper: (res: any) => RES
  ): Promise<ServiceResult<RES>>;
}

export class ApiService implements IApiService {
  protected host: string;
  protected axiosInstance: Axios;

  static api: ApiService;

  constructor(host: string, ctx: IApiContext = {}) {
    this.host = host;
    this.axiosInstance = AxiosService.instance(this.host, ctx);
  }

  static instance(host: string, ctx: IApiContext = {}) {
    if (this.api) return this.api;
    this.api = new ApiService(host, ctx);
  }

  async fetch<REQ, RES>(
    method: Method,
    props: RequestParams<REQ>
  ): Promise<ServiceResult<RES>> {
    let fetch: any = null;
    const { url, params, ctx = {} } = props;

    if (props.ctx?.token) {
      ctx["headers"] = {
        ...ctx["headers"],
        Authorization: `Bearer ${ctx.token}`,
      };
    }

    switch (method) {
      case "GET":
        fetch = this.axiosInstance.get(
          AxiosService.generateRequest(url, params),
          ctx
        );
        break;
      case "POST":
        fetch = this.axiosInstance.post(url, JSON.stringify(props.params), ctx);
        break;
      default:
        break;
    }
    return AxiosService.generateResponse<RES>(await fetch);
  }

  async get<REQ, RES>(props: RequestParams<REQ>): Promise<ServiceResult<RES>> {
    return await this.fetch("GET", props);
  }

  async post<REQ, RES>(props: RequestParams<REQ>): Promise<ServiceResult<RES>> {
    return await this.fetch("POST", props);
  }
}