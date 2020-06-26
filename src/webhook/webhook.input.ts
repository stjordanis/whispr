import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class WebhookInputType {
  @Field(() => String)
  url: string;

  @Field(() => [String], { nullable: true })
  events: string[];

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter: Record<string, unknown>;
}
