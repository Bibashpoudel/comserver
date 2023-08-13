import { Blob } from 'buffer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class updateJobs {
  @IsOptional()
  title?: string;
  @IsOptional()
  stack?: string;
  @IsOptional()
  slug?: string;
  @IsOptional()
  isPreview?: boolean;
  @IsOptional()
  content?: Blob;
}

export class applyJob {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  position: string;
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  intro: string;
}
