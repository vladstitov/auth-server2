import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'userFiles'
})

export class UserFiles extends Model<UserFiles>  {
  @Column
  filename: string;

  @Column
  status: string;

  @Column
  parent: string;

  @Column
  uid: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

}
