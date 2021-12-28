import { Application } from "express";

import {
  create,
  readAll,
  readOne,
  deleteOne,
  deleteOneSpecific
} from "../controller/checkout.controller";

export const checkoutRoutes = (app: Application) => {
  app.post("/checkout", create);
  app.get("/checkout", readAll);
  app.get("/checkout/:userId", readOne);
  app.delete("/checkout", deleteOne);
  app.delete("/checkout/:checkoutId", deleteOneSpecific);
};
