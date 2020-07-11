import * as Argon from 'argon2';
import { BeforeCreate, Column, Model, Table } from 'sequelize-typescript';
import { ARGON_HASHING_THREADS, ARGON_HASHING_TIME } from '../constants';

@Table
export default class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phone: string;

  @Column
  mail: string;

  @Column
  password: string;

  public async comparePasswords(password: string): Promise<boolean> {
    return Argon.verify(this.password, password);
  }

  @BeforeCreate
  private static async passwordHashing(instance: User): Promise<void> {
    instance.password = await Argon.hash(instance.password, {
      type: Argon.argon2id,
      parallelism: ARGON_HASHING_THREADS,
      timeCost: ARGON_HASHING_TIME,
    });
  }

  public toJSON(): any {
    const json: any = super.toJSON();
    delete json.password;
    return json;
  }
}
