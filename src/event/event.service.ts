import { Injectable, Logger } from '@nestjs/common';
import { WebhookService } from '../webhook/webhook.service';
import { IListener, ListenerCallback } from '../interfaces/listener.interface';
import { filterPayload } from '../utils/filterPayload.service';
import { Event, EventNames } from './event.entity';

@Injectable()
export class EventService {
  private registeredListeners: Record<string, IListener[]> = {};

  constructor(private webhookService: WebhookService) {
    this.resetListeners();
  }

  public async triggerEvent(event: Event): Promise<void> {
    await this.registerListeners();
    const listeners = this.registeredListeners[event.name];

    listeners.forEach((listener) => {
      if (filterPayload(listener.filter, event.payload)) {
        listener.callback(event);
      }
    });
  }

  private async registerListeners() {
    this.resetListeners();
    await this.registerWebhooks();
  }

  private resetListeners() {
    Object.values(EventNames).forEach((eventName) => {
      this.registeredListeners[eventName] = [];
    });
  }

  private async registerWebhooks() {
    const webhooks = await this.webhookService.findAll();

    webhooks.forEach((webhook) => {
      webhook.events.forEach(async (eventName) => {
        this.registerListener(
          eventName,
          await WebhookService.getCallFunction(webhook),
          webhook.filter,
        );
      });
    });
  }

  private registerListener(
    eventName: string,
    callback: ListenerCallback,
    filter: Record<string, unknown> = {},
  ) {
    if (!EventService.doesEventExist(eventName)) {
      Logger.error(
        `Could not register listener, Event ${eventName} does not exist.`,
      );
      return;
    }

    const listener = { callback, filter };

    this.registeredListeners[eventName] = [
      ...this.registeredListeners[eventName],
      listener,
    ];
  }

  private static doesEventExist(eventName: string): boolean {
    return Object.values(EventNames).includes(eventName as EventNames);
  }
}
