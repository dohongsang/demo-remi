import { Axios, AxiosRequestConfig, Method } from "axios";
import { ApplicationConfig } from "../utils/config";
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

  accessToken!: string;
  static api: ApiService;

  constructor(host: string, ctx: IApiContext = {}) {
    this.host = host;
    this.axiosInstance = AxiosService.instance(this.host, ctx);
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  async fetch<REQ, RES>(
    method: Method,
    props: RequestParams<REQ>
  ): Promise<ServiceResult<RES>> {
    let fetch: any = null;
    const { url, params } = props;
    switch (method) {
      case "GET":
        fetch = this.axiosInstance.get(
          AxiosService.generateRequest(url, params),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                this.accessToken ?? ApplicationConfig.VITE_PUBLIC_TOKEN
              }`,
            },
          }
        );
        break;
      case "POST":
        fetch = this.axiosInstance.post(url, JSON.stringify(props.params), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              this.accessToken ?? ApplicationConfig.VITE_PUBLIC_TOKEN
            }`,
          },
        });
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

ApiService.api = new ApiService(ApplicationConfig.VITE_REST_API ?? "");
