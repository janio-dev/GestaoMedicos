import { IsString } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  title: string;
}
