import { Column, DeletedAt, Length, Model, Table } from 'sequelize-typescript';

@Table
export class Doctor extends Model {
  @Length({ min: 5, max: 120 })
  @Column
  name: string;
  @Length({ min: 1, max: 10 })
  @Column
  crm: number;
  @Length({ min: 5, max: 120 })
  @Column
  telephoneFixed: string;
  @Column
  cellPhone: string;
  @Length({ min: 8, max: 8 })
  @Column
  cep: number;
  @Column
  medicalSpecialty: string;
  @Column
  address: string;
  @DeletedAt
  deletionDate: Date;
}
