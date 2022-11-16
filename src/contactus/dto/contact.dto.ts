import { IsNotEmpty, IsString } from 'class-validator';

export class ContactUsDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  message: string;

  phone?: string;
}

export class NewsLetterDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
