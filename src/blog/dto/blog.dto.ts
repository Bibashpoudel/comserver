import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  content: BinaryData;

  @IsNotEmpty()
  categories: string;

  @IsNotEmpty()
  tag: Array<string>;

  isTrue?: boolean = false;
}

export class CategoriesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
