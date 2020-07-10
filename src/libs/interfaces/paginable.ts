import { Model } from 'sequelize-typescript';

export interface Paginable<T extends Model> {
  page: number;
  limit: number;
  total: number;
  data: T[];
}
