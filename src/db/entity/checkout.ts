import { Entity, Column } from "typeorm";

import Model from "./base";

// TODO: add a unique field that will be used for shipping and tracking of checked out items

@Entity("checkout")
export class Checkout extends Model {
  @Column({ nullable: false })
  userId: number;

  @Column("int", { nullable: false, array: true })
  productIds: Array<number>;

  @Column("int", { nullable: false, array: true })
  productCounts: Array<number>;

  @Column("money", { nullable: false })
  totalCost: number;
}
