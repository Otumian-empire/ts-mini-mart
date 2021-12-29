import { Request, Response } from "express";

import { Product } from "../db/entity/product";
import { ProductReqType, ResponseType } from "../utils/types";
import apiMessages from "../utils/api_messages";

export const create = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const { name, description, price, count }: ProductReqType = req.body;

    const product = Product.create({ name, description, price, count });
    await product.save();

    response.success = true;
    response.message = apiMessages.CREATED_SUCCESSFULLY;
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
    message: apiMessages.INVALID_PRODUCT
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
    message: apiMessages.AN_ERROR_OCCURRED
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
    response.message = apiMessages.UPDATED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const deleteOne = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const productId = Number(req.body.productId);

    const product: Product = await Product.findOneOrFail({ id: productId });
    await product.remove();

    response.success = true;
    response.message = apiMessages.DELETED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
