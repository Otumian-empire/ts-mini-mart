import "reflect-metadata";

import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";

import { PORT } from "./config/config";
import { userRoutes } from "./routes/user.route";
import { productRoutes } from "./routes/product.route";
import { cartRoutes } from "./routes/cart.route";
import { checkoutRoutes } from "./routes/checkout.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
userRoutes(app);
productRoutes(app);
cartRoutes(app);
checkoutRoutes(app);

createConnection()
  .then(async () => {
    app.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
