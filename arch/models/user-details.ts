import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table({
  tableName: 'memberDetails'
})

export class UserDetails extends Model<UserDetails>  {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  address1: string;

  @Column
  address2: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  birthDate: Date;

  @Column
  city: string;

  @Column
  country: string;

  @Column
  createdAt: Date;

  @Column
  email: string;

  @Column
  email2: string;

  @Column
  gender: string;

  @Column
  gluuuid: string;

  @Column
  language: string;

  @Column
  metaData: string;

  @Column
  metaData2: string;

  @Column
  middleName: string;

  @Column
  parent: string;

  @Column
  phone: string;

  @Column
  phone2: string;

  @Column
  postalCode: string;

  @Column
  province: string;

  @Column
  roles: string;

  @Column
  uid: string;

  @Column
  updatedAt: string;

  @Column
  user_id: number;
}
