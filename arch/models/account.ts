import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'members'
})

export class Account extends Model<Account>  {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  confirmed: Date;

  @Column
  createdAt: string;

  @Column
  email: string;

  @Column
  nickname: string;

  @Column
  password: string;

  @Column
  session: string;

  @Column
  status: string;

  @Column
  statusID: string;

  @Column
  token: string;

  @Column
  uid: string;

  @Column
  updatedAt: Date;
}
