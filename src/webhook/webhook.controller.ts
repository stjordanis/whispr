import { Controller, Post, Get, Body, HttpCode } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { IWebhook } from '../interfaces/webhook.interface';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() webhook: IWebhook) {
    return this.webhookService.create(webhook);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.webhookService.findAll();
  }
}
