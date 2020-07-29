import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Logger } from '../utils/log4js';

@Injectable()
export class TasksService {
  @Cron('45 * * * * *')
  handleCron() {
    Logger.debug("每45秒执行一次")
  }
}
