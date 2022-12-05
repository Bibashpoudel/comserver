import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  image: string;

  addedBy?: string;

  @IsNotEmpty()
  content: BinaryData;

  isTrue?: boolean = false;
}
