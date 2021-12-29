import { Request, Response } from "express";

import { Product } from "../db/entity/product";

type ProductReqType = {
  name: string;
  description: string;
  price: number;
  count: number;
};

type ResponseType = { success: boolean; message: string };

export const create = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: "An error occurred"
  };

  try {
    const { name, description, price, count }: ProductReqType = req.body;

    const product = Product.create({ name, description, price, count });
    await product.save();

    response.success = true;
    response.message = "Created successfully";
  } catch (err) {
    console.log(err);
  }

  return res.json(response);
};

export const readAll = async (req_: Request, res: Response) => {
  let products: Product[] = [];

  try {
    products = await Product.find({});
  } catch (err) {
    console.log(err);
  }

  return res.json(products);
};

export const readOne = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: "Invalid product"
  };

  try {
    const productId = Number(req.params.productId);

    const product: Product = await Product.findOneOrFail({ id: productId });

    return res.json(product);
  } catch (err) {
    console.log(err);
  }

  return res.json(response);
};

export const updateOne = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: "An error occurred"
  };

  try {
    const productId = Number(req.body.productId);
    const { name, description, price, count }: ProductReqType = req.body;

    const product: Product = await Product.findOneOrFail({ id: productId });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.count = count || product.count;

    await product.save();

    response.success = true;
    response.message = "Updated successfully";
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const deleteOne = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: "An error occurred"
  };

  try {
    const productId = Number(req.body.productId);

    const product: Product = await Product.findOneOrFail({ id: productId });
    await product.remove();

    response.success = true;
    response.message = "Deleted successfully";
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
