import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { ObjectId } from "mongodb";

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

export const updateUserImage = async (req: Request, res: Response) => {
  // Get image from user
  const userId: ObjectId = req.user.id;
  const { image } = req.body;

  try {
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      { $set: { image } }
    );
    if (updateUser.matchedCount === 0) {
      return res.status(400).json({ error: "No User Found with ID" });
    }
    return res.status(200).json({ message: "Successfully changed image!" });
  } catch (error) {
    return res.status(500).json({ error: "Server Internal Error" });
  }
};
