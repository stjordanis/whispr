import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Webhook {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  url: string;

  @Field(() => [String], { nullable: true })
  events: string[];

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter: Record<string, unknown>;
}
