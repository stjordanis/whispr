import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import { IWebhook } from '../interfaces/webhook.interface';
import { Event } from '../event/event.entity';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel('Webhook') private readonly webhookModel: Model<IWebhook>,
  ) {}

  async create(webhook: IWebhook): Promise<IWebhook> {
    return this.webhookModel.create(webhook);
  }

  async findAll(): Promise<IWebhook[]> {
    return this.webhookModel.find();
  }

  static async getCallFunction(webhook: IWebhook) {
    return async (event: Event): Promise<void> => {
      await axios.post(webhook.url, {
        eventName: event.name,
        content: event.payload,
      });
    };
  }
}
