import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'user_family'
})

export class UserFamily extends Model<UserFamily>  {
  @Column
  family_role: string;

  @Column
  familyRole_id: number;

  @Column
  user_id: number;

  @Column
  user_id2: string;

  @Column
  uid: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

}
