import { Entity, Column } from "typeorm";

import Model from "./base";

@Entity("consumer")
export class User extends Model {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  address: string;
}
