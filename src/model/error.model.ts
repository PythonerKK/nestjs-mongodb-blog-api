import { BaseModel } from './base.model';

export class ErrorResponse extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = -1
  }
}