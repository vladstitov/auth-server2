import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'familyRoles'
})

export class FamilyRoles extends Model<FamilyRoles> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  belongs: string;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

}
