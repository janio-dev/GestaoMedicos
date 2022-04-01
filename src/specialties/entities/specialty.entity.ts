import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Specialty extends Model {
  @Column
  title: string;
}
