import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel";

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.user.id).select(
      "_id email name country age image"
    );
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};
