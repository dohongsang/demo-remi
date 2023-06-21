export class Response<RES> {
  status: string;
  data: RES;

  constructor(data: RES) {
    Object.assign(this, this.wrapResponse(data));
  }

  static ok<RES>(data: RES): Response<RES> {
    return new Response<RES>(data);
  }

  private wrapResponse(data: RES) {
    return {
      status: "OK",
      data,
    };
  }
}
