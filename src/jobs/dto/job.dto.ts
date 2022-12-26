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

export class updateJobs {
  @IsNotEmpty()
  isPreview: boolean;

  content: Blob;
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
