import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export default class BlackList extends Model<BlackList> {
  @PrimaryKey
  @Column
  token: string;
}
