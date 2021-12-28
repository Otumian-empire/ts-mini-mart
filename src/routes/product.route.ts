import { Application } from "express";

import {
  create,
  readAll,
  readOne,
  updateOne,
  deleteOne
} from "../controller/product.controller";

export const productRoutes = (app: Application) => {
  app.post("/product", create);
  app.get("/product", readAll);
  app.get("/product/:id", readOne);
  app.put("/product", updateOne);
  app.delete("/product", deleteOne);
};
