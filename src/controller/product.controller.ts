import { Request, Response } from "express";

import { Product } from "../db/entity/product";

type ProductReqType = {
  name: string;
  description: string;
  price: number;
  count: number;
};

export const create = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: "An error occurred"
  };

  try {
    const {
      name,
      description,
      price = 0,
      count = 0
    }: ProductReqType = req.body;

    const product = Product.create({ name, description, price, count });

    await product.save();

    response.success = true;
    response.message = "Created successfully";
  } catch (err) {
    console.log(err);
  }

  return res.json(response);
};

export const readAll = async (req: Request, res: Response) => {
  let products: Product[] = [];

  try {
    products = await Product.find({});
  } catch (err) {
    console.log(err);
  }

  return res.json(products);
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product: Product = await Product.findOneOrFail({ id });

    return res.json(product);
  } catch (err) {
    console.log(err);
  }

  return res.status(404).json({
    success: false,
    message: "Invalid product"
  });
};

export const updateOne = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: "An error occurred"
  };

  try {
    const productId = Number(req.body.productId);
    const product: Product = await Product.findOneOrFail({ id: productId });

    const {
      name = product.name,
      description = product.description,
      price = product.price,
      count = product.count
    }: ProductReqType = req.body;

    product.name = name;
    product.description = description;
    product.price = price;
    product.count = count;

    await product.save();

    response.success = true;
    response.message = "Updated successfully";
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const deleteOne = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: "An error occurred"
  };

  try {
    const productId = Number(req.body.productId);
    const user: Product = await Product.findOneOrFail({ id: productId });

    await user.remove();

    response.success = true;
    response.message = "Deleted successfully";
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
