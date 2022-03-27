import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({}); // remove all users
    const usersPopulated = await User.insertMany(data.users);
    res.send({ usersPopulated });
  })
);

export default userRouter;
