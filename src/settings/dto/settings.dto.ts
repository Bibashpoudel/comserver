import { Blob } from 'buffer';
import { IsNotEmpty } from 'class-validator';

export class addPrivacy {
  @IsNotEmpty()
  privacyData: Blob;
}

export class addTerms {
  @IsNotEmpty()
  termsData: Blob;
}
