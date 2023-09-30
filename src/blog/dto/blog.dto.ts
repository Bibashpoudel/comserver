import { Blob } from 'buffer';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
    title: string;

  @IsString()
  @IsNotEmpty()
    content: Blob;

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
