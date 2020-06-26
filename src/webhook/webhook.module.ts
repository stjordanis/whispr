import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { webhookSchema } from './webhook.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Webhook', schema: webhookSchema }]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}
