import { Request, Response } from "express";

import { User } from "../db/entity/user";
import apiMessages from "../utils/api_messages";
import {
  ResponseType,
  UserReqType,
  UpdateOneUserReqType
} from "../utils/types";

export const create = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.AN_ERROR_OCCURRED
  };

  try {
    const { name, email, address }: UserReqType = req.body;

    const user = User.create({ name, email, address });
    await user.save();

    response.success = true;
    response.message = apiMessages.CREATED_SUCCESSFULLY;
  } catch (err) {
    console.log(err);
  }

  return res.json(response);
};

export const readAll = async (_req: Request, res: Response) => {
  let users: User[] = [];

  try {
    users = await User.find({});
  } catch (err) {
    console.log(err);
  }

  return res.json(users);
};

export const readOne = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: apiMessages.INVALID_USER
  };

  try {
    const userId = Number(req.params.userId);

    const user: User = await User.findOneOrFail({ id: userId });

    return res.json(user);
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
    const { userId, email, address }: UpdateOneUserReqType = req.body;

    const user: User = await User.findOneOrFail({ id: userId });

    user.email = email || user.email;
    user.address = address || user.address;

    // an error will be thrown if user.save() fails
    await user.save();

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
    const userId = Number(req.body.userId);

    const user: User = await User.findOneOrFail({ id: userId });
    await user.remove();

    response.success = true;
    response.message = apiMessages.DELETED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
