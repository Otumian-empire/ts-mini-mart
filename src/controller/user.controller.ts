import { Request, Response } from "express";

import { User } from "../db/entity/user";

type UserReqType = { name: string; email: string; address: string };
type ResponseType = { success: boolean; message: string };
type UpdateOneUserReqType = {
  userId: number;
  email: string;
  address: string;
};

export const create = async (req: Request, res: Response) => {
  const response: ResponseType = {
    success: false,
    message: "An error occurred"
  };

  try {
    const { name, email, address }: UserReqType = req.body;

    const user = User.create({ name, email, address });
    await user.save();

    response.success = true;
    response.message = "Created successfully";
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
    message: "Invalid user"
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
    message: "An error occurred"
  };

  try {
    const { userId, email, address }: UpdateOneUserReqType = req.body;

    const user: User = await User.findOneOrFail({ id: userId });

    user.email = email || user.email;
    user.address = address || user.address;

    // an error will be thrown if user.save() fails
    await user.save();

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
    const userId = Number(req.params.userId);

    const user: User = await User.findOneOrFail({ id: userId });
    await user.remove();

    response.success = true;
    response.message = "Deleted successfully";
  } catch (error) {
    console.log(error);
  }

  return res.json(response);
};
