import { Entity, Column } from "typeorm";

import Model from "./base";

@Entity("cart")
export class Cart extends Model {
  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false, default: 0 })
  productCount: number;
}
