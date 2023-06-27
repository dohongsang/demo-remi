import {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { IApiContext } from ".";
import { ServiceResult } from "./models/service-result";

export class AxiosService extends Axios {
  protected axiosConfig: AxiosRequestConfig;
  private static axiosInstance: Axios | null;

  constructor(baseURL: string, config: IApiContext = {}) {
    const axiosConfig = {
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`,
      },
      timeout: 30000,
      ...config,
    };
    super(axiosConfig);
    this.axiosConfig = axiosConfig;
  }

  static instance(baseURL: string, config: IApiContext = {}): Axios {
    if (this.axiosInstance) return this.axiosInstance;

    const axiosInstance = new AxiosService(baseURL, config);
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError
    );
    return axiosInstance;
  }

  private static onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    return config;
  };

  private static onRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  private static onResponse(response: AxiosResponse): AxiosResponse {
    return response?.data ? JSON.parse(response.data) : null;
  }

  private static onResponseError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  static generateResponse<Entity>({
    data,
    status,
    meta,
  }: any): ServiceResult<Entity> {
    return new ServiceResult<Entity>({
      status: status,
      data: data,
      total: meta?.pagination?.total ?? 0,
      page: meta?.pagination?.page ?? 0,
      pageCount: meta?.pagination?.pageCount ?? 0,
    });
  }

  static generateRequest<REQ>(url: string, request: REQ): string {
    return [url, qs.stringify(request, { encodeValuesOnly: true })].join("?");
  }
}
