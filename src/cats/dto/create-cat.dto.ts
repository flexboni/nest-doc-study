import { IsNumber, IsString } from 'class-validator';
import Joi from 'joi';

export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }
