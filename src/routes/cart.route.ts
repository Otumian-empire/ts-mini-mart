import { Application } from "express";

import {
  create,
  readAll,
  readOne,
  readOneSpecific,
  updateOne,
  deleteOne,
  deleteOneSpecific
} from "../controller/cart.controller";

export const cartRoutes = (app: Application) => {
  app.post("/cart", create);
  app.get("/cart", readAll);
  app.get("/cart/:userId", readOne);
  app.get("/cart/:userId/:cartId", readOneSpecific);
  app.put("/cart/:cartId", updateOne);
  app.delete("/cart", deleteOne);
  app.delete("/cart/:cartId", deleteOneSpecific);
};
