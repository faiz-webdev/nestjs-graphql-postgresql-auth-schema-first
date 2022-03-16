import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponseModel {
  @Field(() => String, { description: 'id of the user' })
  userId: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'role of the user' })
  role: string;
}
