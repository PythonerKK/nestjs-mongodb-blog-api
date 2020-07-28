import { BaseModel } from './base.model';

export class SuccessResponse extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
  }
}