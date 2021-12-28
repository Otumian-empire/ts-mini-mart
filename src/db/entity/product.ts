import { Entity, Column } from "typeorm";

import Model from "./base";

@Entity()
export class Product extends Model {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true, default: "Sample product" })
  description: string;

  @Column("money", { nullable: false, default: 0 })
  price: number;

  @Column({ nullable: false, default: 0 })
  count: number;
}
