import { Application } from "express";

import {
  create,
  readAll,
  readOne,
  deleteOne,
  updateOne
} from "../controller/user.controller";

export const userRoutes = (app: Application) => {
  app.post("/user", create);
  app.get("/user", readAll);
  app.get("/user/:userId", readOne);
  app.put("/user", updateOne);
  app.delete("/user", deleteOne);
};
