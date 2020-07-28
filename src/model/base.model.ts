export class BaseModel {
  msg: string;
  data: any;
  code: number;

  constructor(data, message) {
    if (typeof data === "string") {
      this.msg = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.msg = message
    }
  }
}
