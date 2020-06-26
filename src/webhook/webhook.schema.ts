import * as mongoose from 'mongoose';

export const webhookSchema = new mongoose.Schema({
  url: String,
  events: [String],
  filter: Object,
});

mongoose.model('Webhook', webhookSchema);
