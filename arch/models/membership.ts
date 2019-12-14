import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'membership'
})

export class Membership extends Model<Membership> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  createdAt: Date;

  @Column
  memberType: string;

  @Column
  memberType_id: number;

  @Column
  status: string;

  @Column
  updatedAt: Date;

  @Column
  user_id: number;

}
