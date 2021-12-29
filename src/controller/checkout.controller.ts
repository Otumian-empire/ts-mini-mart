import { Request, Response } from "express";

import { Checkout } from "../db/entity/checkout";
import { Cart } from "../db/entity/cart";
import { User } from "../db/entity/user";
import { Product } from "../db/entity/product";
import { ResponseType } from "../utils/types";
import { convertMoneyToNumber } from "../utils/helpers";
import apiMessages from "../utils/api_messages";

export const create = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const userId = Number(req.body.userId);

    // throws error if the user with `userId` doesn't exist
    await User.findOneOrFail({ id: userId });

    const userCartItems: Cart[] = await Cart.find({ userId });

    if (userCartItems.length < 1) {
      response.success = false;
      response.message = apiMessages.CART_IS_EMPTY;

      return res.json(response);
    }

    const productIds: number[] = [];
    const productCounts: number[] = [];

    let totalCost = 0;

    for (const { productId, productCount } of userCartItems) {
      const product = await Product.findOneOrFail({
        id: productId
      });

      if (productCount > product.count) {
        response.success = false;
        response.message = `${product.count} ${product.name}(s) available, you requested ${productCount}. Update cart`;

        return res.json(response);
      }

      totalCost =
        totalCost +
        convertMoneyToNumber(product.price.toString()) * productCount;

      productIds.push(productId);
      productCounts.push(productCount);
    }

    const checkout = Checkout.create({
      userId,
      productIds,
      productCounts,
      totalCost
    });

    await checkout.save();

    // updated the product count after checkout
    for (let index = 0; index < productIds.length; index++) {
      const checkedOutProduct: Product = await Product.findOneOrFail({
        id: productIds[index]
      });

      checkedOutProduct.count = checkedOutProduct.count - productCounts[index];
      await checkedOutProduct.save();
    }

    // delete the cart after checkout
    userCartItems.forEach(async (cartItem) => await cartItem.remove());

    response.success = true;
    response.message = apiMessages.CREATED_SUCCESSFULLY;
  } catch (err) {
    console.log(err);
  }

  return res.json(response);
};

export const readAll = async (_req: Request, res: Response) => {
  let checkouts: Checkout[] = [];

  try {
    checkouts = await Checkout.find({});
  } catch (err) {
    console.log(err);
  }

  return res.json(checkouts);
};

export const readOne = async (req: Request, res: Response) => {
  let checkout: Checkout[] = [];

  try {
    const userId = Number(req.params.userId);

    await User.findOneOrFail({ id: userId });

    checkout = await Checkout.find({ userId });
  } catch (err) {
    console.log(err);
  }

  return res.json(checkout);
};

// TODO: find a reason to implement update for checkout

export const deleteOne = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const userId = Number(req.body.userId);

    await User.findOneOrFail({ id: userId });

    const checkouts = await Checkout.find({ userId });
    checkouts.forEach(async (item) => await item.remove());

    response.success = true;
    response.message = apiMessages.DELETED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};

export const deleteOneSpecific = async (req: Request, res: Response) => {
  const response = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const userId = Number(req.body.userId);
    const checkoutId = Number(req.params.checkoutId);

    await User.findOneOrFail({ id: userId });

    const checkouts = await Checkout.find({ userId, id: checkoutId });
    checkouts.forEach(async (item) => await item.remove());

    response.success = true;
    response.message = apiMessages.DELETED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
