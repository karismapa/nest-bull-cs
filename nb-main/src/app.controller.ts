import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send')
  async sendMessage() {
    await this.appService.sendMessage()
  }

  @Post('sendNamed')
  async sendNamedMessage() {
    await this.appService.sendNamedMessage()
  }
}
