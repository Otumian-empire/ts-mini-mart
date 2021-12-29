import { Request, Response } from "express";

import { Cart } from "../db/entity/cart";
import { Product } from "../db/entity/product";
import { CartRequestType, ResponseType } from "../utils/types";
import apiMessages from "../utils/api_messages";

export const create = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const { userId, productId, productCount }: CartRequestType = req.body;

    // throws error is product of said Id doesn't exist
    const product: Product = await Product.findOneOrFail({ id: productId });

    // user can not buy more than the quantity of products in  currently
    // (at the time of making the request)
    if (productCount > product.count) {
      response.success = false;
      response.message = `Insufficient ${product.name} available (${product.count})`;

      return res.json(response);
    }

    // increment rather than create a new row if the current user has the
    // product in count
    let cart: Cart = await Cart.findOne({ userId, productId });

    if (cart) {
      cart.productCount = cart.productCount + productCount;
    } else {
      cart = Cart.create({ userId, productId, productCount });
    }

    await cart.save();

    response.success = true;
    response.message = apiMessages.ADDED_SUCCESSFULLY;
  } catch (err) {
    console.log(err);
  }

  return res.json(response);
};

export const readAll = async (_req: Request, res: Response) => {
  let products: Cart[] = [];

  try {
    products = await Cart.find({});
  } catch (err) {
    console.log(err);
  }

  return res.json(products);
};

export const readOne = async (req: Request, res: Response) => {
  let carts: Cart[] = [];

  try {
    const userId = Number(req.params.userId);

    carts = await Cart.find({ userId });
  } catch (err) {
    console.log(err);
  }

  return res.json(carts);
};

export const readOneSpecific = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.INVALID_CART
  };

  try {
    const userId = Number(req.params.userId);
    const cartId = Number(req.params.cartId);

    const cart: Cart = await Cart.findOneOrFail({ userId, id: cartId });

    return res.json(cart);
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const updateOne = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const cartId = Number(req.params.cartId);
    const userId = Number(req.body.userId);
    const productCount = Number(req.body.productCount);

    const cart: Cart = await Cart.findOneOrFail({ userId, id: cartId });

    cart.productCount = productCount || cart.productCount;
    await cart.save();

    response.success = true;
    response.message = apiMessages.UPDATED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const deleteOne = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const userId = Number(req.body.userId);

    const cartItems: Cart[] = await Cart.find({ userId });
    cartItems.forEach(async (item) => await item.remove());

    response.success = true;
    response.message = apiMessages.DELETED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const deleteOneSpecific = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const userId = Number(req.body.userId);
    const cartId = Number(req.params.cartId);

    const cartItem: Cart = await Cart.findOneOrFail({ userId, id: cartId });
    await cartItem.remove();

    response.success = true;
    response.message = apiMessages.DELETED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
