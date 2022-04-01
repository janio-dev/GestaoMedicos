import { IsString, IsNumber, IsNumberString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;
  @IsNumber()
  crm: number;
  @IsNumberString()
  telephoneFixed: number;
  @IsNumberString()
  cellPhone: number;
  @IsNumber()
  cep: number;
  @IsString()
  medicalSpecialty: string;
}
