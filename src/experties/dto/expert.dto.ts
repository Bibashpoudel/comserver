import { IsNotEmpty, IsString } from 'class-validator';

export class addExpertDto {
  @IsString()
  @IsNotEmpty()
    title: string;

  @IsNotEmpty()
    items?: Array<string>;
}
