import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'memberTypes'
})

export class MemberTypes extends Model<MemberTypes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  belongs: string;

  @Column
  parent: string;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

}
