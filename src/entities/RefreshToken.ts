import * as moment from 'moment';
import * as crypto from 'crypto';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './User';

@Table
export default class RefreshToken extends Model<RefreshToken> {
  @PrimaryKey
  @Column
  token: string;

  @Column(DataType.BIGINT)
  expiresIn: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  public init(user: User, expireTime: number): void {
    this.user = user;
    this.token = crypto.randomBytes(32).toString('hex');
    this.expiresIn = moment()
      .add(expireTime, 's')
      .toDate()
      .getTime();
  }

  public isExpired(): boolean {
    return moment().isAfter(this.expiresIn);
  }
}
