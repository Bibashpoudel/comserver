import { Blob } from 'buffer';
import { IsNotEmpty, IsString } from 'class-validator';

export class addJobs {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  stack: string;
  @IsString()
  @IsNotEmpty()
  slug: string;

  isPreview: boolean;

  @IsNotEmpty()
  content: Blob;
}
